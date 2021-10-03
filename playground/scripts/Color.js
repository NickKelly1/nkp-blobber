import { Publisher } from './Publisher.js';
import { Select } from './Select.js';

/** @typedef {import('./types').IUpdateable<T>} IUpdateable @template T */
/** @typedef {import('./Container').Container} Container */

/**
 * @typedef {{
 *  orange: string;
 *  yellow: string;
 *  gold: string;
 *  green: string;
 *  aqua: string;
 *  cyan: string;
 *  blue: string;
 *  purple: string;
 *  magenta: string;
 *  hotPink: string;
 *  red: string;
 * }} IColors
 */

/**
 * @typedef {keyof IColors} Color
 */

/**
 * @implements {IUpdateable<Colors>}
 * @implements {IColors}
 *
 * Loads colours from css variables
 *
 * Keeps values in-sync with css variables using MutationObserver
 * (haven't verified this actually works)
 */
export class Colors {
  static service = true;

  /**
   * @param {Element} elem
   * @returns {IColors}
   */
  static extract(elem) {
    const style = window.getComputedStyle(elem);
    const orange = style.getPropertyValue('--orange');
    const yellow = style.getPropertyValue('--yellow');
    const gold = style.getPropertyValue('--gold');
    const green = style.getPropertyValue('--green');
    const aqua = style.getPropertyValue('--aqua');
    const cyan = style.getPropertyValue('--cyan');
    const blue = style.getPropertyValue('--blue');
    const purple = style.getPropertyValue('--purple');
    const magenta = style.getPropertyValue('--magenta');
    const hotPink = style.getPropertyValue('--hot-pink');
    const red = style.getPropertyValue('--red');
    return {
      orange,
      yellow,
      gold,
      green,
      aqua,
      cyan,
      blue,
      purple,
      magenta,
      hotPink,
      red,
    };
  }

  /** @protected @type {Container} */ _container;
  /** @protected @type {IColors} */ _values;
  /** @readonly @type {Publisher<Colors>} */ update$ = new Publisher();

  /**
   * @param {Container} container
   */
  static create(container) {
    const select = container.get(Select);
    const colors = Colors.extract(select.colors());
    return new Colors(container, colors);
  }

  /**
   * @param {Container} container
   * @param {IColors} values
   */
  constructor(container, values) {
    this._values = values;
  }

  /** @type {string} */ get orange() { return this._values.orange; }
  /** @type {string} */ get yellow() { return this._values.yellow; }
  /** @type {string} */ get gold() { return this._values.gold; }
  /** @type {string} */ get green() { return this._values.green; }
  /** @type {string} */ get aqua() { return this._values.aqua; }
  /** @type {string} */ get cyan() { return this._values.cyan; }
  /** @type {string} */ get blue() { return this._values.blue; }
  /** @type {string} */ get purple() { return this._values.purple; }
  /** @type {string} */ get magenta() { return this._values.magenta; }
  /** @type {string} */ get hotPink() { return this._values.hotPink; }
  /** @type {string} */ get red() { return this._values.red; }
  /** @type {string[]} */ get all() { return Object.values(this._values); }

  /**
   * Get the colors and listen to updates
   */
  watch() {
    const mut = new MutationObserver((muts) => {
      /** @type {any} */
      const elem = muts[0].target;
      this._values = Colors.extract(elem);
    });

    mut.observe(this._container.get(Select).colors(), {
      attributes: true,
      attributeFilter: ['style',],
    });

    this._values = Colors.extract(this._container.get(Select).colors());
    this.update$.next(this);
  }

  /**
   * Re-load the colours from the document
   */
  reload() {
    this._values = Colors.extract(this._container.get(Select).colors());
    this.update$.next(this);
  }
}
