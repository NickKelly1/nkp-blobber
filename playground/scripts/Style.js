'use strict';

import { Colors } from './Color.js';
import { Container } from './Container.js';
import { Observable } from './Observable.js';
import { Publisher } from './Publisher.js';

/** @typedef {import("./types").IUpdateable<T>} IUpdateable @template T */


/**
 * @implements {IUpdateable<void>}
 */
export class Style {
  /** @protected @readonly @type {Container} */ _container;

  /**
   * Get a default line style
   *
   * @param {Container} container
   * @returns {Style}
   */
  static line(container) {
    const style = new Style(container);
    const colors = container.get(Colors);
    style.update((self) => {
      self.fillStyle.set(colors.red);
      self.strokeStyle.set(colors.red);
    });
    return style;
  }

  /**
   * Get a default node style
   *
   * @param {Container} container
   * @returns {Style}
   */
  static node(container) {
    const style = new Style(container);
    const colors = container.get(Colors);
    style.update((self) => {
      self.fillStyle.set(colors.hotPink);
      self.strokeStyle.set(colors.hotPink);
    });
    return style;
  }

  /**
   * @param {Container} container
   */
  constructor(container) {
    this._container = container;
  }

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
    if (fillStyle) ctx.fillStyle = fillStyle.trim();
    if (strokeStyle) ctx.strokeStyle = strokeStyle.trim();
  }
}
