/**Auto-generated by: https://github.com/angular-threejs/gltf
Command: npx angular-three-gltf&#64;1.1.11 apps/kitchen-sink/public/Astronaut-transformed.glb -o apps/kitchen-sink/src/app/soba/backdrop-cable/astronaut.ts --selector app-astronaut --name Astronaut
**/

import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	effect,
	ElementRef,
	inject,
	input,
	Signal,
	viewChild,
} from '@angular/core';
import { extend, NgtGroup, NgtObjectEvents } from 'angular-three';
import { injectGLTF } from 'angular-three-soba/loaders';
import type * as THREE from 'three';
import { Group, Mesh } from 'three';
import { GLTF } from 'three-stdlib';

export type AstronautGLTFResult = GLTF & {
	nodes: {
		Astronaut_mesh: THREE.Mesh;
	};
	materials: {
		Astronaut_mat: THREE.MeshStandardMaterial;
	};
};

@Component({
	selector: 'app-astronaut',
	template: `
		@if (gltf(); as gltf) {
			<ngt-group #model [parameters]="options()">
				<ngt-mesh
					[receiveShadow]="true"
					[castShadow]="true"
					[geometry]="gltf.nodes.Astronaut_mesh.geometry"
					[material]="gltf.materials.Astronaut_mat"
				/>

				<ng-content />
			</ngt-group>
		}
	`,
	hostDirectives: [
		{
			directive: NgtObjectEvents,
			outputs: [
				'click',
				'dblclick',
				'contextmenu',
				'pointerup',
				'pointerdown',
				'pointerover',
				'pointerout',
				'pointerenter',
				'pointerleave',
				'pointermove',
				'pointermissed',
				'pointercancel',
				'wheel',
			],
		},
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Astronaut {
	protected readonly Math = Math;

	options = input({} as Partial<NgtGroup>);

	modelRef = viewChild<ElementRef<Group>>('model');

	protected gltf = injectGLTF(() => '/Astronaut-transformed.glb') as unknown as Signal<AstronautGLTFResult | null>;

	constructor() {
		extend({ Group, Mesh });

		effect(() => {
			const gltf = this.gltf();
			if (!gltf) return;

			for (const materialKey in gltf.materials) {
				gltf.materials[materialKey as keyof AstronautGLTFResult['materials']].roughness = 0;
			}
		});

		const objectEvents = inject(NgtObjectEvents, { host: true });
		effect(() => {
			const model = this.modelRef()?.nativeElement;
			if (!model) return;

			objectEvents.ngtObjectEvents.set(model);
		});
	}
}
