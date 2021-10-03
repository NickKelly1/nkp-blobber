'use strict';

import { Observable } from './Observable.js';
import { Publisher } from './Publisher.js';

/** @typedef {import("./types").IUpdateable<T>} IUpdateable @template T */


/**
 * @implements {IUpdateable<void>}
 */
export class Style {
  // @ts-ignore TODO: ts-ignore remove if jsdoc is working
  /** @type {Observable<?string>} */ fillStyle = new Observable(null);
  // @ts-ignore TODO: ts-ignore remove if jsdoc is working
  /** @type {Observable<?string>} */ strokeStyle = new Observable(null);
  /** @type {Publisher<void>} */ update$ = new Publisher();

  /**
   * @param {(self: this) => void} callbackfn
   */
  update(callbackfn) {
    callbackfn(this);
    this.update$.next();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  apply(ctx) {
    const fillStyle = this.fillStyle.get();
    const strokeStyle = this.fillStyle.get();
    if (fillStyle) ctx.fillStyle = fillStyle;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
  }
}
