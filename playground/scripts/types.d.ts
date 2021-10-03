import { Publisher } from './Publisher';

export interface IUpdateable<T> {
  update$: Publisher<T>;
}

export interface XY {
  x: number;
  y: number;
}
