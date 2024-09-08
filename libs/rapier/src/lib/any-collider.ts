import { Directive, effect, inject, input, untracked } from '@angular/core';
import { NgtrAnyCollider } from './rigid-body';
import {
	NgtrBallArgs,
	NgtrCapsuleArgs,
	NgtrConeArgs,
	NgtrConvexHullArgs,
	NgtrConvexMeshArgs,
	NgtrCuboidArgs,
	NgtrCylinderArgs,
	NgtrHeightfieldArgs,
	NgtrPolylineArgs,
	NgtrRoundConeArgs,
	NgtrRoundConvexHullArgs,
	NgtrRoundConvexMeshArgs,
	NgtrRoundCuboidArgs,
	NgtrRoundCylinderArgs,
	NgtrTrimeshArgs,
} from './types';

@Directive({
	selector: 'ngt-object3D[ngtrCuboidCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrCuboidCollider {
	args = input.required<NgtrCuboidArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('cuboid');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrCapsuleCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrCapsuleCollider {
	args = input.required<NgtrCapsuleArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrBallCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrBallCollider {
	args = input.required<NgtrBallArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrConvexHullCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrConvexHullCollider {
	args = input.required<NgtrConvexHullArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrHeightfieldCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrHeightfieldCollider {
	args = input.required<NgtrHeightfieldArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrTrimeshCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrTrimeshCollider {
	args = input.required<NgtrTrimeshArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrPolylineCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrPolylineCollider {
	args = input.required<NgtrPolylineArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrRoundCuboidCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrRoundCuboidCollider {
	args = input.required<NgtrRoundCuboidArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrCylinderCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrCylinderCollider {
	args = input.required<NgtrCylinderArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrRoundCylinderCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrRoundCylinderCollider {
	args = input.required<NgtrRoundCylinderArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrConeCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrConeCollider {
	args = input.required<NgtrConeArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrRoundConeCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrRoundConeCollider {
	args = input.required<NgtrRoundConeArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrConvexMeshCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrConvexMeshCollider {
	args = input.required<NgtrConvexMeshArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrRoundConvexHullCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrRoundConvexHullCollider {
	args = input.required<NgtrRoundConvexHullArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}

@Directive({
	selector: 'ngt-object3D[ngtrRoundConvexMeshCollider]',
	standalone: true,
	hostDirectives: [
		{
			directive: NgtrAnyCollider,
			inputs: ['options', 'name', 'scale', 'position', 'quaternion', 'rotation', 'userData'],
		},
	],
})
export class NgtrRoundConvexMeshCollider {
	args = input.required<NgtrRoundConvexMeshArgs>();

	constructor() {
		const anyCollider = inject(NgtrAnyCollider, { host: true });
		anyCollider.setShape('roundConvexMesh');
		effect(() => {
			const args = this.args();
			untracked(() => {
				anyCollider.setArgs(args);
			});
		});
	}
}
