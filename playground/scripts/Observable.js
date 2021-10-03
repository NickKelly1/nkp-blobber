import { Publisher } from './Publisher.js';

/**
 * @template T
 * @extends {Publisher<T>}
 */
export class Observable extends Publisher {
  /** @protected @type {T} */ _value;

  /**
   * @param {T} value
   */
  constructor(value) {
    super();
    this._value = value;
  }

  /**
   * @returns {T}
   */
  get() {
    return this._value;
  }

  /**
   * @param {T} to
   */
  set(to) {
    this._value = to;
    this.next(to);
  }
}
