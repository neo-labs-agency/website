import { type ComponentType, lazy, type LazyExoticComponent } from "react";

type PreloadableComponent<T extends ComponentType<unknown>> =
  LazyExoticComponent<T> & {
    preload: () => Promise<{ default: T }>;
  };

export function lazyWithPreload<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  const LazyComponent = lazy(factory) as PreloadableComponent<T>;
  LazyComponent.preload = factory;
  return LazyComponent;
}
