import { Container } from '../Container.js';
import { Coordinates } from '../Coordinates.js';
import { Drawable } from '../Drawable.js';
import { Node } from '../Node.js';
import { Style } from '../Style.js';
import { connect } from '../utils.js';

/**
 */
export class Line extends Drawable {
  /** @protected @type {Container} */ _container;
  /** @protected @type {Node} */ _from;
  /** @protected @type {Node} */ _to;
  /** @protected @type {Style} */ _style;

  /**
   * @param {Container} container
   * @param {Node} from
   * @param {Node} to
   * @param {Style} [style]
   */
  constructor(container, from, to, style) {
    super();
    this._container = container;
    this._from = from;
    this._to = to;
    this._style = style || Style.line(container);
    this.register(connect(this, this._style));
  }

  /**
   * @override
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const co = this._container.get(Coordinates);
    const style = this._style;
    style.apply(ctx);
    const fromX = co.scaleX(this._from.x);
    const fromY = co.scaleY(this._from.y);
    const toX = co.scaleX(this._to.x);
    const toY = co.scaleY(this._to.y);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
}
