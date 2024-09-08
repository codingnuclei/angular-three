import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtrCuboidCollider, NgtrPhysics, NgtrRigidBody } from 'angular-three-rapier';
import { NgtsOrbitControls } from 'angular-three-soba/controls';

@Component({
	standalone: true,
	template: `
		<ngtr-physics [options]="{ debug: true }">
			<ngt-object3D ngtrRigidBody="fixed" [options]="{ colliders: 'hull', restitution: 2 }">
				<ngt-mesh>
					<ngt-torus-geometry />
				</ngt-mesh>
			</ngt-object3D>

			<ngt-object3D ngtrCuboidCollider [position]="[0, -2, 0]" [args]="[20, 0.5, 20]" />
		</ngtr-physics>

		<ngts-orbit-controls />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'experience-basic-rapier' },
	imports: [NgtrPhysics, NgtrRigidBody, NgtrCuboidCollider, NgtArgs, NgtsOrbitControls],
})
export class Experience {}
