'use strict';

import { Container } from './Container';
import { Coordinates } from './Coordinates';
import { Drawable } from './Drawable';
import { Observable } from './Observable';
import { Publisher } from './Publisher';
import { Style } from './Style';

/** @typedef {import('./types').IUpdateable<T>} IUpdateable @template T */
/** @typedef {import('./types').XY} XY */

export class Node extends Drawable {
  /** @protected @readonly @type {Container} */ _container;
  /** @protected @readonly @type {Observable<number>} */ _padding;

  /** @readonly @type {Publisher<number>} */ x$ = new Publisher();
  /** @readonly @type {Publisher<number>} */ y$ = new Publisher();
  /** @type {Style} */ style;
  /** @type {number} */ x;
  /** @type {number} */ y;

  /**
   * @param {Container} container
   * @param {XY} xy
   * @param {Style} style
   * @param {?Observable<number>} padding
   */
  constructor(container, xy, style, padding) {
    super();
    this._container = container;
    const { x, y, } = xy;
    this.x = x;
    this.y = y;
    this.style = style;
    this._padding = padding || new Observable(5);
  }

  /**
   * @param {number} x
   */
  setX(x) {
    this.x = x;
    this.x$.next(x);
    this.update$.next(this);
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.y = y;
    this.y$.next(y);
    this.update$.next(this);
  }

  /**
   * @param {{ x: number; y: number }} xy
   */
  set(xy) {
    const { x, y, } = xy;
    this.x = x;
    this.x$.next(x);
    this.y = y;
    this.y$.next(y);
    this.update$.next(this);
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const fillColor = this.style.fillStyle.get();
    const strokeColor = this.style.strokeStyle.get();
    const padding = this._padding.get();
    const co = this._container.get(Coordinates);
    if (fillColor) ctx.fillStyle = fillColor;
    if (strokeColor) ctx.strokeStyle = strokeColor;
    ctx.rect(
      co.scaleX(this.x - padding),
      co.scaleY(this.y - padding),
      co.scaleX(this.x + padding),
      co.scaleY(this.y + padding),
    );
  }
}
