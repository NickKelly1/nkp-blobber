import { Drawable } from '../Drawable.js';
import { Observable } from '../Observable.js';

/** @typedef {import('./types').Draggable} Draggable */
/** @typedef {import('./types').Nodeable} Nodeable */
/** @typedef {import('./types').XY} XY */
/** @typedef {import('./Container').Container} Container */
/** @typedef {import('./Node').Node} Node */

/**
 * @implements {Draggable}
 */
export class Handle extends Drawable {
  /** @type {Observable<number>} */ zIndex = new Observable(1);
  /** @override @protected @readonly @type {Container} */ _container;
  /** @protected @type {Node} */ _center;
  /** @protected @type {Observable<number>} */ _radius;

  /**
   * @param {Container} container
   * @param {Node} center
   * @param {Observable<number>} radius
   */
  constructor(container, center, radius) {
    super();
    this._container = container;
    this._center = center;
    this._radius = radius;
  }

  /**
   * @param {MouseEvent} evt
   * @returns {boolean}
   */
  onDrag(evt) {
    // TODO: determine if drag occured on this item
    console.log('handling drag?');
    const canvas = this._container.select().canvas();
    console.log(evt.clientX - canvas.offsetLeft);
    this._center.set({
      x: evt.clientX - canvas.offsetLeft,
      y: evt.clientY - canvas.offsetTop,
    });
    return true;
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const scale = this._container.scale();
    ctx.strokeStyle = this._container.colors().cyan;
    const _radius = this._radius.get();
    ctx.moveTo(_radius + scale.x(this._center.x), scale.y(this._center.y));
    ctx.arc(scale.x(this._center.x), scale.y(this._center.y), _radius, 0, 2 * Math.PI);
  }
}
