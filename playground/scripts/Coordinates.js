import { Container } from './Container.js';
import { Publisher } from './Publisher.js';
import { Select } from './Select.js';

/** @typedef {import('./types').IUpdateable<T>} IUpdateable @template T */

/**
 * @implements {IUpdateable<void>}
 */
export class Coordinates {
  /** @readonly @type {string} */ static tag = '$co';
  /** @readonly @type {boolean} */ static service = true;
  /** @readonly @type {string} */ tag = Coordinates.tag;
  /** @readonly @type {Publisher<void>} */ update$ = new Publisher();

  /**
   * @param {Container} container
   * @returns {Coordinates}
   */
  static initialise(container) {
    const co = new Coordinates(container);
    co.watch();
    return co;
  }

  /**
   * Get the height modifier
   *
   * @param {HTMLCanvasElement} canvas
   * @returns {number}
   */
  static widthFactor(canvas) {
    return canvas.height / 100;
  }

  /**
   * Get the width modifier
   *
   * @param {HTMLCanvasElement} canvas
   * @returns {number}
   */
  static heightFactor(canvas) {
    return canvas.width / 100;
  }

  /** @protected @type {number} */ _height;
  /** @protected @type {number} */ _width;
  /** @protected @type {Container} */ _container;
  /** @protected @type {?ResizeObserver} */ _resizeObserver = null;

  /**
   * @param {Container} container
   */
  constructor(container) {
    this._container = container;
    const canvas = this._container.get(Select).canvas();
    this._recache(canvas);
  }

  /**
   * Refresh width and height modifiers
   * @param {HTMLCanvasElement} canvas
   */
  _recache(canvas) {
    this._height = Coordinates.widthFactor(canvas);
    this._width = Coordinates.heightFactor(canvas);
  }

  /**
   * Convert a relative x position to an absolute x position
   *
   * @param {number} xin
   * @returns {number}
   */
  scaleX(xin) {
    return xin * this._width;
  }

  /**
   * Convert an absolute x position to an relative x position
   *
   * @param {number} xin
   * @returns {number}
   */
  unscaleX(xin) {
    return xin / this._width;
  }

  /**
   * Convert a relative y position to an absolute y position
   *
   * @param {number} yin
   * @returns {number}
   */
  scaleY(yin) {
    return yin * this._height;
  }

  /**
   * Convert a absolute y position to an relative y position
   *
   * @param {number} yin
   * @returns {number}
   */
  unscaleY(yin) {
    return yin / this._height;
  }

  /**
   * Watch the canvas for changes
   *
   * @protected
   */
  watch() {
    this._resizeObserver = new ResizeObserver(() => {
      console.debug(`[${this.tag}::watch::ResizeObserver] resizing`);
      const canvas = this._container.get(Select).canvas();
      this._resize(canvas);
      this._recache(canvas);
      this.update$.next();
    });
    const canvas = this._container.get(Select).canvas();
    this._resize(canvas);
    this._recache(canvas);
    this._resizeObserver.observe(canvas);
    this.update$.next();
  }

  /**
   * fix dpi issues
   *
   * @protected
   * @param {HTMLCanvasElement} canvas
   * @returns {void}
   *
   * @see https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
   */
  _resize(canvas) {
    const dpi = globalThis.devicePixelRatio;
    const nextHeight = dpi * Number(globalThis
      .getComputedStyle(canvas)
      .getPropertyValue('height')
      // remove ending px
      .slice(0, -2));
    const nextWidth = dpi * Number(globalThis
      .getComputedStyle(canvas)
      .getPropertyValue('width')
      // remove ending px
      .slice(0, -2));
    canvas.setAttribute('height', nextHeight.toString());
    canvas.setAttribute('width', nextWidth.toString());
    console.debug(`[${this.tag}::_resize] resizing to ${nextWidth}, ${nextHeight}`);
  }
}
