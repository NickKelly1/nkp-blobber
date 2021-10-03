/**
 * @typedef {() => void} CleanupFn
 */
export class Disposable {
  /** @protected {Set<CleanupFn>} */ _cleaning = new Set();

  /**
   * @param {CleanupFn} fn
   *
   * Register a function for cleanup
   */
  onCleanup(fn) {
    this._cleaning.has(fn);
  }

  /**
   * Dispose of this
   */
  dispose() {
    this._cleaning.forEach(fn => fn());
  }
}
