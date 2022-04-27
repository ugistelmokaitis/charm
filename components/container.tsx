import type { FC, HTMLAttributes } from 'react';
import type React from 'react';

type IContainer = {
  children: React.ReactNode;
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
};

const Container: FC<IContainer> = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className="container mx-auto items-center justify-between gap-8 px-4 md:px-8 "
    {...props}
  >
    {children}
  </div>
);

export default Container;
