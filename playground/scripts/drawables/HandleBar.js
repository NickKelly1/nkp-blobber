'use strict';

import { Handle } from './Handle.js';
import { Bar } from './Line.js/index.js';
import { Drawable } from './Drawable.js';

/** @typedef {import('./types').Nodeable} Nodeable */
/** @typedef {import('./types').XY} XY */
/** @typedef {import('./Container').Container} Container */
/** @typedef {import('./Observable').Observable<T>} Observable @template T */
/** @typedef {import('./Node').Node} Node */

export class HandleBar extends Drawable {
  /** @override @protected @type {Container} */ _container;

  /**
   * @param {Container} container
   * @param {Node} from
   * @param {Node} to
   * @param {Observable<number>} radius
   */
  constructor(container, from, to, radius) {
    super();
    this._container = container;

    this._addChild(new Bar(
      container,
      from,
      to,
      // TODO
      // new TransformNode(to, () => {
      //   const _radius = radius.get();
      //   const dx = to.x - from.x;
      //   const dy = to.y - from.y;
      //   if (dy === 0 && dx === 0) return to;
      //   if (dy === 0) return { x: to.x - _radius, y: to.y, };
      //   if (dx === 0) return { x: to.x, y: to.y - _radius, };
      //   const angle = Math.atan(dx / dy);
      //   return {
      //     x: to.x - _radius * Math.cos(angle),
      //     y: to.y - _radius * Math.sin(angle),
      //   };
      // }),
    ));

    this._addChild(new Handle(
      container,
      to,
      radius,
    ));
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    //
  }
}
