import { Colors } from './Color.js';
import { Container } from './Container.js';
import { Coordinates } from './Coordinates.js';
import { Drawable } from './Drawable.js';
import { Select } from './Select.js';

export class AnimationManager {
  /**
   * @param {Container} container
   * @returns {AnimationManager}
   */
  static initialise(container) {
    return new AnimationManager(container);
  }

  /** @readonly @type {string} */ static tag = '$am';
  /** @readonly @type {boolean} */ static service = true;
  /** @readonly @type {string} */ tag = AnimationManager.tag;

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
    const canvas = container.get(Select).canvas();
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get canvas context');
    this._ctx = ctx;
    container.get(Coordinates).update$.on(() => this.update());
    container.get(Colors).update$.on(() => this.update());

    // handle drag
    const self = this;
    canvas.addEventListener('mousedown', function handleMouseDown(mouseDownEvent) {
      for (const drawable of self._drawables) {
        const stop = drawable.onDrag(mouseDownEvent);
        if (stop) return;
      }
    });
  }

  /**
   * Add an object to draw
   *
   * @param {Drawable} drawable
   * @returns {() => void}
   */
  add(drawable) {
    if (this._drawables.has(drawable)) {
      console.debug(`[${this.tag}::add] drawable ${drawable.name} is already added`);
      return () => { /* */ };
    }
    drawable.update$.on(this.update);
    this._drawables.add(drawable);
    this.update();
    return () => this.remove(drawable);
  }

  /**
   * @param {Drawable} drawable
   */
  remove(drawable) {
    if (!this._drawables.has(drawable)) {
      console.debug(`[${this.tag}::remove] drawable`
        + `${drawable.name} is not added`);
      return;
    }
    this._watchers.delete(drawable);
    this._drawables.delete(drawable);
    this.update();
  }

  /**
   * Update the animation
   */
  update() {
    console.debug(`${AnimationManager.tag}::update`);
    if (this.id == null) {
      this.id = requestAnimationFrame(this.draw);
    }
  }

  /**
   * Draw
   */
  draw() {
    this._renders += 1;
    console.group(`[${this.tag}::draw] render: ${this._renders} | items: ${this._grid.size + this._drawables.size}`);
    const start = performance.now();
    this.id = null;
    const ctx = this._ctx;
    const canvas = this._container.get(Select).canvas();
    const { width, height, } = canvas;
    console.log({ width, height, });
    ctx.clearRect(0, 0, width, height);
    this._grid.forEach((drawable) => { drawable.draw(ctx); });
    this._drawables.forEach((drawable) => { drawable.draw(ctx); });
    const end = performance.now();
    console.debug(`[${this.tag}::draw] ${(end- start).toFixed(2)}ms`);
    console.groupEnd();
  }
}
