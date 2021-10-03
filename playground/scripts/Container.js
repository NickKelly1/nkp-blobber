/**
 * @exports
 * @typedef {{
 *  tag?: string;
 *  service: boolean;
 *  name: string;
 *  new(...args: any[]): T;
 * }} ServiceConstructor
 * @template T
 */

export class Container {
  /** @protected @readonly @type {Map<ServiceConstructor<any>, any>} */
  _services = new Map();

  // make services available to browser console
  /** @protected @readonly @type {any} */
  t = Object.create(null);

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
    if (Constructor.tag) { this.t[Constructor.tag] = instance; }
    this._services.set(Constructor, instance);
  }
}
