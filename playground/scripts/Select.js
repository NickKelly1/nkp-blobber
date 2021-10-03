import { Container } from './Container.js';
import { a, $ } from './utils.js';

export class Select {
  /**
   * @param {Container} container
   * @returns {Select}
   */
  static initialise(container) {
    return new Select(container);
  }

  /** @readonly @type {string} */ static tag = '$s';
  /** @readonly @type {boolean} */ static service = true;
  /** @readonly @type {string} */ tag = Select.tag;

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
