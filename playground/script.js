// Observable.

import { AnimationManager } from './scripts/Animator';
import { boot } from './scripts/boot';

// const observable = new Observable(function (
//   /** @type {string} */ val,
// ) {
//   //
// });


const container = boot();
const am = container.get(AnimationManager);
am.add();
