declare module 'react-grid-layout' {
  import type { ComponentType, ReactNode } from 'react';

  export type Layout = {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
  };

  export interface GridLayoutProps {
    className?: string;
    layout: Layout[];
    cols?: number;
    rowHeight?: number;
    onLayoutChange?: (layout: Layout[]) => void;
    draggableHandle?: string;
    children?: ReactNode;
  }

  const GridLayout: ComponentType<GridLayoutProps>;
  export function WidthProvider<P>(component: ComponentType<P>): ComponentType<P>;
  export default GridLayout;
}
