// Observable.

import { AnimationManager } from './scripts/AnimationManager.js';
import { boot } from './scripts/boot.js';
import { Line } from './scripts/drawables/Line.js';
import { Node } from './scripts/Node.js';
import { Style } from './scripts/Style.js';

// const observable = new Observable(function (
//   /** @type {string} */ val,
// ) {
//   //
// });


const container = boot();
const am = container.get(AnimationManager);
const from = new Node(container, { x: 1, y: 1,});
const to = new Node(container, { x: 99, y: 99, });
am.add(from);
am.add(to);
am.add(new Line(container, from, to));
