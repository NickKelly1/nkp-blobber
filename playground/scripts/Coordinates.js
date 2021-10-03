'use strict';

import { Container } from './Container';
import { Select } from './Select';

export class Coordinates {
  static service = true;

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

  /**
   * @param {Container} _container
   */
  constructor(_container) {
    this._container = _container;
    this.refresh();
  }

  /**
   * Refresh width and height modifiers
   */
  refresh() {
    const canvas = this._container.get(Select).canvas();
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
   * Convert a relative y position to an absolute y position
   *
   * @param {number} yin
   * @returns {number}
   */
  scaleY(yin) {
    return yin * this._height;
  }
}
