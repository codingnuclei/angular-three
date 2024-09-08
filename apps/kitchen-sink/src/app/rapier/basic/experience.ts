import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtrCuboidCollider, NgtrPhysics, NgtrRigidBody } from 'angular-three-rapier';
import { NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
import { NgtsOrbitControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-torus',
	standalone: true,
	template: `
		<ngt-mesh>
			<ngt-torus-geometry />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Torus {}

@Component({
	standalone: true,
	template: `
		<ngt-color attach="background" *args="['black']" />

		<ngts-perspective-camera [options]="{ makeDefault: true, position: [20, 40, 40] }" />

		<ngtr-physics [options]="{ debug: true }">
			<ngt-object3D ngtrRigidBody [options]="{ colliders: 'hull' }" [position]="[0, 4, 0]">
				<app-torus />
			</ngt-object3D>

			<ngt-object3D ngtrCuboidCollider [position]="[0, -1, 0]" [args]="[20, 0.5, 20]" />
		</ngtr-physics>

		<ngts-orbit-controls />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'experience-basic-rapier' },
	imports: [NgtrPhysics, NgtrRigidBody, NgtrCuboidCollider, NgtArgs, NgtsOrbitControls, Torus, NgtsPerspectiveCamera],
})
export class Experience {}
