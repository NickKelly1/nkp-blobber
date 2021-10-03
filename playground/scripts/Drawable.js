import { Disposable } from './Disposable.js';
import { Publisher } from './Publisher.js';

/** @typedef {import('./types.js').IUpdateable<T>} IUpdateable @template T */

/**
 * @abstract
 * @implements {IUpdateable<void>}
 */
export class Drawable extends Disposable {
  /** @type {string} */ get name() { return this.constructor.name; }
  /** @type {Publisher<void>} */ update$ = new Publisher();

  /**
   * @param {MouseEvent} evt
   * @returns {boolean}
   */
  onDrag(evt) {
    return false;
  }

  /**
   * @abstract
   * @method draw
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  draw(ctx) {
    throw new Error(`${this.name}::draw not implemented`);
  }
}
