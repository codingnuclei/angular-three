import {
	afterNextRender,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	ComponentRef,
	computed,
	createEnvironmentInjector,
	DestroyRef,
	effect,
	ElementRef,
	EnvironmentInjector,
	inject,
	Injector,
	input,
	NgZone,
	output,
	signal,
	Type,
	untracked,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NgxResize, provideResizeOptions, ResizeOptions, ResizeResult } from 'ngxtension/resize';
import { Raycaster, Scene, Vector3 } from 'three';
import { createPointerEvents } from './dom/events';
import { provideNgtRenderer } from './renderer';
import { injectCanvasRootInitializer, NgtCanvasConfigurator } from './roots';
import { NgtRoutedScene } from './routed-scene';
import { injectStore, provideStore } from './store';
import { NgtCanvasOptions, NgtDomEvent, NgtDpr, NgtGLOptions, NgtPerformance, NgtSize, NgtState } from './types';
import { is } from './utils/is';

@Component({
	selector: 'ngt-canvas',
	template: `
		<div (ngxResize)="resizeResult.set($event)" style="height: 100%; width: 100%;">
			<canvas #glCanvas style="display: block;"></canvas>
		</div>
	`,
	imports: [NgxResize],
	providers: [
		provideResizeOptions({
			emitInZone: false,
			emitInitialResult: true,
			debounce: { scroll: 50, resize: 0 },
		} as ResizeOptions),
		provideStore(),
	],
	host: {
		style: 'display: block;position: relative;width: 100%;height: 100%;overflow: hidden;',
		'[style.pointerEvents]': 'hbPointerEvents()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgtCanvas<
	TSceneGraph extends Type<any> | 'routed',
	TSceneCmp = TSceneGraph extends Type<infer Cmp> ? Cmp : NgtRoutedScene,
> {
	private store = injectStore();
	private initRoot = injectCanvasRootInitializer();

	private host = inject<ElementRef<HTMLElement>>(ElementRef);
	private zone = inject(NgZone);
	private environmentInjector = inject(EnvironmentInjector);
	private injector = inject(Injector);

	sceneGraph = input.required<Type<TSceneCmp>, TSceneGraph>({
		transform: (value) => {
			if (value === 'routed') return NgtRoutedScene;
			return value;
		},
	});
	gl = input<NgtGLOptions>();
	size = input<NgtSize>();
	shadows = input(false, {
		transform: (value) => {
			if (value === '') return booleanAttribute(value);
			return value as NonNullable<NgtCanvasOptions['shadows']>;
		},
	});
	legacy = input(false, { transform: booleanAttribute });
	linear = input(false, { transform: booleanAttribute });
	flat = input(false, { transform: booleanAttribute });
	orthographic = input(false, { transform: booleanAttribute });
	frameloop = input<NonNullable<NgtCanvasOptions['frameloop']>>('always');
	performance = input<Partial<Omit<NgtPerformance, 'regress'>>>();
	dpr = input<NgtDpr>([1, 2]);
	raycaster = input<Partial<Raycaster>>();
	scene = input<Scene | Partial<Scene>>();
	camera = input<NonNullable<NgtCanvasOptions['camera']>>();
	events = input(createPointerEvents);
	eventSource = input<HTMLElement | ElementRef<HTMLElement>>();
	eventPrefix = input<NonNullable<NgtCanvasOptions['eventPrefix']>>('offset');
	lookAt = input<Vector3 | Parameters<Vector3['set']>>();

	created = output<NgtState>();
	rendered = output<ComponentRef<TSceneCmp>>();
	pointerMissed = outputFromObservable(this.store.get('pointerMissed$'));

	private glCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('glCanvas');
	private glCanvasViewContainerRef = viewChild.required('glCanvas', { read: ViewContainerRef });

	protected hbPointerEvents = computed(() => (this.eventSource() ? 'none' : 'auto'));

	// NOTE: this signal is updated outside of Zone
	protected resizeResult = signal<ResizeResult>({} as ResizeResult, { equal: Object.is });
	private configurator = signal<NgtCanvasConfigurator | null>(null);

	private glEnvironmentInjector?: EnvironmentInjector;
	private glRef?: ComponentRef<TSceneCmp>;

	constructor() {
		// NOTE: this means that everything in NgtCanvas will be in afterNextRender.
		// this allows the content of NgtCanvas to use effect instead of afterNextRender
		afterNextRender(() => {
			const canvasElement = this.glCanvas().nativeElement;
			this.zone.runOutsideAngular(() => {
				this.configurator.set(this.initRoot(canvasElement));
			});

			effect(
				() => {
					const resizeResult = this.resizeResult();
					if (!resizeResult.width || resizeResult.width <= 0 || !resizeResult.height || resizeResult.height <= 0)
						return;

					const configurator = this.configurator();
					if (!configurator) return;

					const canvasOptions = {
						gl: this.gl(),
						shadows: this.shadows(),
						legacy: this.legacy(),
						linear: this.linear(),
						flat: this.flat(),
						orthographic: this.orthographic(),
						frameloop: this.frameloop(),
						performance: this.performance(),
						dpr: this.dpr(),
						raycaster: this.raycaster(),
						scene: this.scene(),
						camera: this.camera(),
						events: this.events(),
						eventSource: this.eventSource(),
						eventPrefix: this.eventPrefix(),
						lookAt: this.lookAt(),
						size: resizeResult,
					};

					this.zone.runOutsideAngular(() => {
						configurator.configure(canvasOptions);

						if (this.glRef) {
							this.glRef.changeDetectorRef.detectChanges();
						} else {
							this.noZoneRender();
						}
					});
				},
				{ injector: this.injector },
			);
		});

		inject(DestroyRef).onDestroy(() => {
			this.glRef?.destroy();
			this.glEnvironmentInjector?.destroy();
			this.configurator()?.destroy();
		});
	}

	private noZoneRender() {
		// NOTE: destroy previous instances if existed
		this.glEnvironmentInjector?.destroy();
		this.glRef?.destroy();

		// NOTE: Flag the canvas active, rendering will now begin
		this.store.update((state) => ({ internal: { ...state.internal, active: true } }));

		const [state, eventSource, eventPrefix] = [
			this.store.snapshot,
			untracked(this.eventSource),
			untracked(this.eventPrefix),
		];

		// connect to event source
		state.events.connect?.(
			eventSource ? (is.ref(eventSource) ? eventSource.nativeElement : eventSource) : this.host.nativeElement,
		);

		// setup compute for eventPrefix
		if (eventPrefix) {
			state.setEvents({
				compute: (event, store) => {
					const { pointer, raycaster, camera, size } = store.snapshot;
					const x = event[(eventPrefix + 'X') as keyof NgtDomEvent] as number;
					const y = event[(eventPrefix + 'Y') as keyof NgtDomEvent] as number;
					pointer.set((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1);
					raycaster.setFromCamera(pointer, camera);
				},
			});
		}

		// emit created event if observed
		this.created.emit(this.store.snapshot);

		if (!this.store.get('events', 'connected')) {
			this.store.get('events').connect?.(untracked(this.glCanvas).nativeElement);
		}

		this.glEnvironmentInjector = createEnvironmentInjector([provideNgtRenderer(this.store)], this.environmentInjector);
		this.glRef = untracked(this.glCanvasViewContainerRef).createComponent(untracked(this.sceneGraph), {
			environmentInjector: this.glEnvironmentInjector,
			injector: this.injector,
		});

		this.glRef.changeDetectorRef.detectChanges();
		this.rendered.emit(this.glRef);
	}
}
