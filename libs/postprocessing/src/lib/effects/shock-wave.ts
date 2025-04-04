import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgtArgs, extend } from 'angular-three';
import { ShockWaveEffect } from 'postprocessing';
import { NgtpEffect, NgtpEffectBlendMode } from '../effect';

extend({ ShockWaveEffect });

export type ShockWaveEffectOptions = Partial<NonNullable<ConstructorParameters<typeof ShockWaveEffect>[0]>>;

@Component({
	selector: 'ngtp-shock-wave',
	template: `
		<ngt-shock-wave-effect *args="[options()]" [camera]="effect.camera()">
			<ngtp-effect-blend-mode />
			<ng-content />
		</ngt-shock-wave-effect>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectBlendMode],
	hostDirectives: [{ directive: NgtpEffect, inputs: ['blendFunction', 'opacity'] }],
})
export class NgtpShockWave {
	effect = inject(NgtpEffect, { host: true });
	options = input({} as Omit<ShockWaveEffectOptions, 'blendFunction'>);
}
