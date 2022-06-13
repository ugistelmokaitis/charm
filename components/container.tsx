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
    className="mx-auto max-w-screen-containerxl items-center justify-between gap-5 px-4 sm:px-8 md:px-12 lg:px-5"
    {...props}
  >
    {children}
  </div>
);

export default Container;
