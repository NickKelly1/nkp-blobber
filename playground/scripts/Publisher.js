/**
 * @exports
 * @typedef {() => void} Unsubscribe
 */

/**
 * @exports
 * @typedef {(value: T) => void} OnNext
 * @template T
 */

/**
 * @exports
 * @typedef {() => void} OnComplete
 */

/**
 * @exports
 * @typedef Subscription
 *
 * @property {OnNext<T>} next
 * @property {OnComplete} [complete]
 *
 * @template T
 */

/**
 * @exports
 * @typedef {() => void} Teardown
 */

/**
 * @template T
 */
export class Publisher {
  /** @protected @readonly @type {Set<Subscription<T>>} */
  _subscribers = new Set();

  /**
   * Subscribe
   *
   * @param {Subscription<T> | OnNext<T>} subscriber
   * @param {OnComplete} [complete]
   * @returns {Unsubscribe}
   */
  on(subscriber, complete) {
    /** @type {Subscription<T>} */
    let _subscription;
    if (typeof subscriber === 'function') {
      _subscription = {
        next: subscriber,
        complete: complete,
      };
    } else {
      _subscription = subscriber;
    }

    this._subscribers.add(_subscription);
    return () => this.off(_subscription);
  }

  /**
   * Unsubscribe a subscriber
   *
   * @param {Subscription<T>} subscriber
   */
  off(subscriber) {
    if (subscriber.complete) subscriber.complete();
    this._subscribers.delete(subscriber);
  }

  /**
   * Fire the next value
   *
   * @param {T} value
   */
  next(value) {
    this
      ._subscribers
      .forEach(observer => observer.next(value));
  }

  /**
   * Destruct this observable
   */
  complete() {
    this
      ._subscribers
      .forEach(observer => observer.complete && observer.complete());
    this._subscribers.clear();
  }

  /**
   * @param {(value: T) => U} callbackfn
   * @returns {Publisher<U>}
   * @template U
   */
  map(callbackfn) {
    /** @type {Publisher<U>} */
    const mapped = new Publisher();

    this.on({
      next: (value) => { mapped.next(callbackfn(value)); },
      complete: () => { mapped.complete(); },
    });

    return mapped;
  }
}
