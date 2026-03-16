import { lazy, type LazyExoticComponent, type ComponentType } from "react";

/**
 * Creates a lazy-loaded component and a preload function that starts loading its chunk.
 * Use preload() on route mount or link hover to fetch the chunk before the component renders.
 */
export function lazyWithPreload<T extends ComponentType<object>>(
  importFn: () => Promise<{ default: T }>
): [LazyExoticComponent<T>, () => Promise<{ default: T }>] {
  const LazyComponent = lazy(importFn as () => Promise<{ default: ComponentType<object> }>);
  const preload = () => importFn();
  return [LazyComponent as LazyExoticComponent<T>, preload];
}
