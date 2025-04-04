import { computed } from '@angular/core';
import { NgtAnyRecord, NgtInstanceNode, NgtLocalInstanceState, NgtLocalState } from './types';
import { signalStore } from './utils/signal-store';
import { checkUpdate } from './utils/update';

export function getLocalState<TInstance extends object>(obj: TInstance | undefined): NgtLocalState | undefined {
	if (!obj) return undefined;
	return (obj as NgtAnyRecord)['__ngt__'];
}

export function invalidateInstance<TInstance extends object>(instance: TInstance) {
	let store = getLocalState(instance)?.store;

	if (store) {
		while (store.snapshot.previousRoot) {
			store = store.snapshot.previousRoot;
		}

		if (store.snapshot.internal.frames === 0) {
			store.snapshot.invalidate();
		}
	}

	checkUpdate(instance);
}

export function prepare<TInstance extends object = NgtAnyRecord>(
	object: TInstance,
	localState?: Partial<NgtLocalState>,
) {
	const instance = object as unknown as NgtInstanceNode<TInstance>;

	if (localState?.primitive || !instance.__ngt__) {
		const {
			instanceStore = signalStore<NgtLocalInstanceState>({
				parent: null,
				objects: [],
				nonObjects: [],
				geometryStamp: Date.now(),
			}),
			...rest
		} = localState || {};

		const nonObjects = instanceStore.select('nonObjects');
		const geometryStamp = instanceStore.select('geometryStamp');

		const nonObjectsChanged = computed(() => {
			const [_nonObjects] = [nonObjects(), geometryStamp()];
			return _nonObjects;
		});

		instance.__ngt__ = {
			previousAttach: null,
			store: null,
			memoized: {},
			eventCount: 0,
			handlers: {},
			instanceStore,
			parent: instanceStore.select('parent'),
			objects: instanceStore.select('objects'),
			nonObjects: nonObjectsChanged,
			add(object, type) {
				const current = instance.__ngt__.instanceStore.snapshot[type];
				const foundIndex = current.findIndex(
					(node: NgtInstanceNode) => object === node || (!!object.uuid && !!node.uuid && object.uuid === node.uuid),
				);

				if (foundIndex > -1) {
					current.splice(foundIndex, 1, object);
					instance.__ngt__.instanceStore.update({ [type]: current });
				} else {
					instance.__ngt__.instanceStore.update((prev) => ({ [type]: [...prev[type], object] }));
				}

				notifyAncestors(instance.__ngt__.instanceStore.snapshot.parent, type);
			},
			remove(object, type) {
				instance.__ngt__.instanceStore.update((prev) => ({ [type]: prev[type].filter((node) => node !== object) }));
				notifyAncestors(instance.__ngt__.instanceStore.snapshot.parent, type);
			},
			setParent(parent) {
				instance.__ngt__.instanceStore.update({ parent });
			},
			updateGeometryStamp() {
				instance.__ngt__.instanceStore.update({ geometryStamp: Date.now() });
			},
			...rest,
		} as NgtLocalState;
	}

	return instance;
}

function notifyAncestors(instance: NgtInstanceNode | null, type: 'objects' | 'nonObjects') {
	if (!instance) return;
	const localState = getLocalState(instance);
	if (!localState) return;
	const { parent } = localState.instanceStore.snapshot;
	localState.instanceStore.update({ [type]: (localState.instanceStore.snapshot[type] || []).slice() });
	notifyAncestors(parent, type);
}
