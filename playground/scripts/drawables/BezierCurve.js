import { Observable } from '../Observable.js';
import { HandleBar } from '../HandleBar.js';
import { Drawable } from '../Drawable.js';

/** @typedef {import('./types').Nodeable} Nodeable */
/** @typedef {import('./types').XY} XY */
/** @typedef {import('./Container').Container} Container */
/** @typedef {import('./Node').Node} Node */

export class BezierCurve extends Drawable {
  /** @override @protected @readonly @type {Container} */ _container;
  /** @protected @readonly @type {Node} */ _from;
  /** @protected @readonly @type {Node} */ _p1;
  /** @protected @readonly @type {HandleBar} */ _p1h;
  /** @protected @readonly @type {Node} */ _p2;
  /** @protected @readonly @type {HandleBar} */ _p2h;
  /** @protected @readonly @type {Node} */ _p3;

  /**
   * @param {Container} container
   * @param {Node} from
   * @param {Node} p1
   * @param {Node} p2
   * @param {Node} p3
   */
  constructor(container, from, p1, p2, p3) {
    super();
    this._container = container;
    this._from = from;
    this._p1 = p1;
    this._p2 = p2;
    this._p3 = p3;
    const radius = new Observable(5);
    this._addChild(new HandleBar(this._container, this._from, this._p1, radius));
    this._addChild(new HandleBar(this._container, this._p3, this._p2, radius));
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const scale = this._container.scale();

    // start handle
    ctx.moveTo(scale.x(this._from.x), scale.y(this._from.y));
    ctx.bezierCurveTo(
      scale.x(this._p1.x),
      scale.y(this._p1.y),

      scale.x(this._p2.x),
      scale.y(this._p2.y),

      scale.x(this._p3.x),
      scale.y(this._p3.y),
    );
    ctx.strokeStyle = this._container.colors().red;
    ctx.stroke();
  }
}
