
/** @typedef {import('./types').IUpdateable<T>} IUpdateable @template T */
/** @typedef {import('./Publisher').Unsubscribe} Unsubscribe */

/**
 * @param {T | null | undefined} v
 * @returns T
 * @template T
 */
export function a(v) {
  if (v == null) throw new TypeError('failed asserting value exists');
  return v;
}


/** @type {Document['querySelector']} $ */
export const $ = document.querySelector.bind(document);

/** @type {Document['querySelectorAll']} $ */
export const $$ = document.querySelectorAll.bind(document);


/**
 * Get array element at an index
 * supports negative and overflow indexing
 *
 * @param {T[]} arr
 * @param {number} index
 * @returns {T}
 * @template T
 */
export function at(arr, index) {
  // implements reverse indexing and index wrapping
  const _index = (index >= 0 ? index : (arr.length + index)) % arr.length;
  return arr[_index % arr.length];
}


/**
 *
 * @param {number} value
 * @param {number} [to]
 * @returns
 */
export function round(value, to = 1) {
  const mult = Number('1' + '0'.repeat(to - 1));
  return Math.round(value * mult) / mult;
}


/**
 * cosine on degrees
 *
 * @param {number} deg
 * @returns {number}
 */
export function cosd(deg) {
  return Math.cos(deg * Math.PI / 180);
}

/**
 * sin on degrees
 *
 * @param {number} deg
 * @returns {number}
 */
export function sind(deg) {
  return Math.sin(deg * Math.PI / 180);
}

/**
 * Put something on the window
 *
 * @param {string} prop
 * @param {() => T} getter
 * @template T
 */
export function globalize(prop, getter) {
  if (prop in globalThis) {
    console.warn(`${prop} is already in globalThis`);
    return;
  }
  Object.defineProperty(globalThis,
    prop,
    { get() { return getter(); }, },
  );
}


/**
 * @param {IUpdateable<void>} self
 * @param {IUpdateable<void>} dependency
 * @returns {import('./Publisher').Unsubscribe}
 */
export function connect(self, dependency) {
  return dependency.update$.on(() => self.update$.next());
}


/**
 * @param {IUpdateable<void>} self
 * @param {IUpdateable<void>} dependency
 * @returns {import('./Publisher').Unsubscribe}
 */
export function disconnect(self, dependency) {
  dependency.update$.off(self);
  return dependency.update$.on(() => self.update$.next());
}
