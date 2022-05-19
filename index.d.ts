import type { FC, SVGAttributes } from 'react';

export type SvgrComponent = FC<SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const value: SvgrComponent;
}
