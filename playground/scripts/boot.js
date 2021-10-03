import { AnimationManager } from './AnimationManager.js';
import { Colors } from './Color.js';
import { Container } from './Container.js';
import { Coordinates } from './Coordinates.js';
import { Select } from './Select.js';
import { globalize } from './utils.js';

/**
 * @returns {Container}
 */
export function boot() {
  const container = new Container();
  container.set(Select, Select.initialise(container));
  container.set(Coordinates, Coordinates.initialise(container));
  container.set(Colors, Colors.initialise(container));
  container.set(AnimationManager, AnimationManager.initialise(container));
  globalize('$c', () => container);
  return container;
}
