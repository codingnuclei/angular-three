import {
	CUSTOM_ELEMENTS_SCHEMA,
	ChangeDetectionStrategy,
	Component,
	afterNextRender,
	computed,
	input,
} from '@angular/core';
import { NgtArgs, injectStore, pick } from 'angular-three-core-new';
import { injectAutoEffect } from 'ngxtension/auto-effect';
import { BlendFunction, LUT3DEffect } from 'postprocessing';
import { Texture } from 'three';

export interface LUTOptions {
	lut: Texture;
	blendFunction?: BlendFunction;
	tetrahedralInterpolation?: boolean;
}

@Component({
	selector: 'ngtp-lut',
	template: `
		<ngt-primitive *args="[effect()]" [dispose]="null" />
	`,
	imports: [NgtArgs],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgtpLUT {
	options = input({} as LUTOptions);
	private lut = pick(this.options, 'lut');

	effect = computed(() => {
		const [lut, { lut: _, ...options }] = [this.lut(), this.options()];
		return new LUT3DEffect(lut, options);
	});

	constructor() {
		const autoEffect = injectAutoEffect();
		const store = injectStore();
		const _invalidate = store.select('invalidate');

		afterNextRender(() => {
			autoEffect(() => {
				const [effect, { lut, tetrahedralInterpolation }, invalidate] = [this.effect(), this.options(), _invalidate()];

				if (tetrahedralInterpolation) effect.tetrahedralInterpolation = tetrahedralInterpolation;
				if (lut) effect.lut = lut;
				invalidate();
			});
		});
	}
}
