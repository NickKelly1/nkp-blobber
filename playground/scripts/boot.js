import { AnimationManager } from './Animator';
import { Colors } from './Color';
import { Container } from './Container';
import { Coordinates } from './Coordinates';
import { Select } from './Select';

/**
 * @returns {Container}
 */
export function boot() {
  const container = new Container();
  container.set(Select, new Select(container));
  container.set(Coordinates, new Coordinates(container));
  container.set(Colors, Colors.create(container));
  container.set(AnimationManager, new AnimationManager(container));
  return container;
}
