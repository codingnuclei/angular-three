import { Directive } from '@angular/core';
import { extend } from 'angular-three';
import { Object3D } from 'three';

@Directive({
	selector: 'ngt-object3D[ngtrMeshCollider]',
	standalone: true,
})
export class NgtrMeshCollider {
	constructor() {
		extend({ Object3D });
	}
}
