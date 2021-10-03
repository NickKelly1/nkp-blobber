import { Container } from './Container';
import { Drawable } from './Drawable';
import { Select } from './Select';

export class AnimationManager {
  static service = true;

  /** @protected @readonly @type {Container} */ _container;
  /** @protected @readonly @type {Set<Drawable>} */ _drawables = new Set();
  /** @protected @readonly @type {Set<Drawable>} */ _grid = new Set();
  /** @protected @type {?number} */ id = null;
  /** @protected @type {number} */ _renders = 0;
  /** @protected @readonly @type {WeakMap<Drawable, (() => any)>} */
  _watchers = new WeakMap();
  /** @protected @readonly @type {CanvasRenderingContext2D} */
  _ctx;


  /**
   * @param {Container} container
   */
  constructor(container) {
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this._container = container;
    const ctx = container.get(Select).canvas().getContext('2d');
    if (!ctx) throw new Error('Unable to get canvas context');
    this._ctx = ctx;
  }

  /**
   * Add an object to draw
   *
   * @param {Drawable} drawable
   * @returns {() => void}
   */
  add(drawable) {
    drawable.update$.on(this.update);
    return () => this.remove(drawable);
  }

  /**
   * @param {Drawable} drawable
   */
  remove(drawable) {
    this._watchers.delete(drawable);
    this._drawables.delete(drawable);
  }

  /**
   * Update the animation
   */
  update() {
    if (this.id == null) {
      this.id = requestAnimationFrame(this.draw);
    }
  }

  /**
   * Draw
   */
  draw() {
    const start = performance.now();

    this.id = null;
    const ctx = this._ctx;

    this._grid.forEach((drawable) => {
      drawable.draw(ctx);
    });

    this._drawables.forEach((drawable) => {
      drawable.draw(ctx);
    });

    const end = performance.now();
    console.debug(`render ${this._renders += 1}`
      + `, ${this._grid.size + this._drawables.size} items`
      + `, ${end- start}ms`);
  }
}
