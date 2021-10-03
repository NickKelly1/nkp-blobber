'use strict';

import { Container } from './Container';
import { a, $ } from './utils';

export class Select {
  static service = true;

  /** @protected @readonly @type {Container} */ _container;

  /**
   * @param {Container} container
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  canvas() {
    return a($('canvas'));
  }

  /**
   * @returns {HTMLBodyElement}
   */
  body() {
    return a($('body'));
  }

  /**
   * @returns {HTMLDivElement}
   */
  colors() {
    /** @type {any} */
    const elem = a($('#colors'));
    return elem;
  }

  /**
   * @returns {HTMLButtonElement}
   */
  btnClear() {
    /** @type {any} */
    const btn = a($('#clear'));
    return btn;
  }
}
