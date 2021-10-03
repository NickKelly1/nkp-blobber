/* eslint-disable no-inner-declarations */
'use strict';

import { Container } from './Container.js';
import { Coordinates } from './Coordinates.js';
import { Drawable } from './Drawable.js';
import { Observable } from './Observable.js';
import { Publisher } from './Publisher.js';
import { Select } from './Select.js';
import { Style } from './Style.js';

/** @typedef {import('./types').IUpdateable<T>} IUpdateable @template T */
/** @typedef {import('./types').XY} XY */

export class Node extends Drawable {
  /** @readonly @type {string} */ static tag = '$node';
  /** @readonly @type {string} */ get tag() { return Node.tag; }

  /** @protected @readonly @type {Container} */ _container;
  /** @protected @readonly @type {Observable<number>} */ _padding;

  /** @readonly @type {Publisher<number>} */ x$ = new Publisher();
  /** @readonly @type {Publisher<number>} */ y$ = new Publisher();
  /** @type {Style} */ style;
  /** @type {number} */ x;
  /** @type {number} */ y;

  /**
   * @param {Container} container
   * @param {XY} xy
   * @param {Style} [style]
   * @param {?Observable<number>} [padding]
   */
  constructor(container, xy, style, padding) {
    super();
    this._container = container;
    const { x, y, } = xy;
    this.x = x;
    this.y = y;
    this.style = style || Style.node(container);
    this._padding = padding || new Observable(1);
  }

  /**
   * @override
   * @param {MouseEvent} evt
   */
  onDrag(evt) {
    console.log(`[${this.tag}::onDrag] handling drag`);
    const canvas = this._container.get(Select).canvas();
    const clickX = evt.pageX - canvas.offsetLeft;
    const clickY = evt.pageY - canvas.offsetTop;
    // check bounding box
    const co = this._container.get(Coordinates);
    const x = this.x;
    const y = this.y;
    const padding = this._padding.get();
    const left = co.scaleX(x - padding);
    const right = co.scaleX(x + padding);
    const top = co.scaleY(y - padding);
    const bottom = co.scaleY(y + padding);
    const handle = clickX >= left && clickX <= right && clickY >= top && clickY <= bottom;
    console.log({
      clickX,
      clickY,
      left,
      right,
      top,
      bottom,
      handle,
    });
    if (!handle) return false;
    const self = this;
    const body = this._container.get(Select).body();
    body.addEventListener('mousemove', handleMouseMove);
    body.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('blur', handleBlur);
    return true;

    function shutdown() {
      const body = self._container.get(Select).body();
      body.removeEventListener('mousemove', handleMouseMove);
      body.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('blur', handleBlur);
    }

    /**
     * @param {MouseEvent} mouseMoveEvent
     */
    function handleMouseMove(mouseMoveEvent) {
      const moveX = mouseMoveEvent.clientX - canvas.offsetLeft;
      const moveY = mouseMoveEvent.clientY - canvas.offsetTop;
      const co = self._container.get(Coordinates);
      self.set({ x: co.unscaleX(moveX), y: co.unscaleY(moveY), });
    }

    /** @param {MouseEvent} mouseUpEvent */
    function handleMouseUp(mouseUpEvent) {
      shutdown();
    }

    /** @param {FocusEvent} blurEvent */
    function handleBlur(blurEvent) {
      shutdown();
    }
  }

  /**
   * @param {number} x
   */
  setX(x) {
    this.x = x;
    this.x$.next(x);
    this.update$.next();
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.y = y;
    this.y$.next(y);
    this.update$.next();
  }

  /**
   * @param {{ x: number; y: number }} xy
   */
  set(xy) {
    const { x, y, } = xy;
    this.x = x;
    this.x$.next(x);
    this.y = y;
    this.y$.next(y);
    this.update$.next();
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const fillColor = this.style.fillStyle.get();
    const strokeColor = this.style.strokeStyle.get();
    const padding = this._padding.get();
    const co = this._container.get(Coordinates);
    if (fillColor) ctx.fillStyle = fillColor;
    if (strokeColor) ctx.strokeStyle = strokeColor;
    const x = co.scaleX(this.x - padding);
    const y = co.scaleY(this.y - padding);
    const w = co.scaleX(2 * padding);
    const h = co.scaleY(2 * padding);
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
}
