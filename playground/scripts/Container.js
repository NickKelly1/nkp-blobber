/**
 * @exports
 * @typedef {{
 *  service: boolean;
 *  name: string;
 *  new(...args: any[]): T;
 * }} ServiceConstructor
 * @template T
 */

export class Container {
  /** @protected @type {Map<any, any>} */ _services = new Map();

  /**
   * @template T
   * @param {ServiceConstructor<T>} Constructor
   * @returns {T}
   */
  get(Constructor) {
    if (!Constructor.service) {
      new TypeError(`${Constructor.name} is not a service`);
    }
    const service = this._services.get(Constructor);
    if (!service) {
      throw new ReferenceError(`${Constructor.name} is not a registered service`);
    }
    return service;
  }


  /**
   * @template T
   * @param {ServiceConstructor<T>} Constructor
   * @param {T} instance
   */
  set(Constructor, instance) {
    if (!Constructor.service) {
      new TypeError(`${Constructor.name} is not a service`);
    }
    this._services.set(Constructor, instance);
  }
}
