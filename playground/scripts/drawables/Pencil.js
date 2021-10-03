'use strict';

import { Drawable } from './Drawable.js';

/**
 * @implements {Drawable}
 */

export class Pencil extends Drawable {
  /** @protected @type {XY[]} */ _points = [];
  /** @protected @type {number} */ _count = 0;
  /** @protected @type {number} */ _treshhold = 2;
  /** @protected @type {boolean} */ _finished = false;

  /**
   * @param {Container} container
   */
  constructor(container) {
    super();
    this._container = container;
  }

  /**
   * @param {MouseEvent} e
   */
  next(e) {
    if (this._finished) {
      console.debug('🤞', 'finger::next', 'tried to draw after finished');
      return;
    }
    if ((this._count % this._treshhold) === 0) {
      const canvas = this._container.select().canvas();
      /** @type {XY} */
      const xy = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
      };
      this._points.push(xy);
      this.$updates.fire();
    }
    this._count += 1;
  }

  /**
   * finish drawing
   */
  finish() {
    this._finished = true;
  }

  /**
   * @override
   *
   * @param {CanvasRenderingContext2D} _ctx
   * @returns {void}
   */
  draw(_ctx) {
    const length = this._points.length;
    if (length <= 0) return;
    _ctx.moveTo(this._points[0].x, this._points[0].y);
    _ctx.strokeStyle = this._container.colors().orange;
    for (let i = 0; i < length; i += 1) {
      // console.debug('🤞', 'drawing', this._points[i]);
      _ctx.lineTo(this._points[i].x, this._points[i].y);
    }
    _ctx.stroke();
  }
}
