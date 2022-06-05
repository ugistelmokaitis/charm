import type { FC, HTMLProps, SVGAttributes } from 'react';

type IBlogButton = {
  LeftIcon: FC<SVGAttributes<SVGElement>>;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
} & HTMLProps<HTMLButtonElement>;

const BlogButton: FC<IBlogButton> = ({ LeftIcon, text, ...props }) => (
  <button
    aria-label="Button"
    type="button"
    className="dark:hover-border-30 flex w-full items-center whitespace-nowrap rounded-lg border-2 border-neutral-30 p-3 px-3 py-3 text-center hover:border-neutral-80"
    {...props}
  >
    {Boolean(LeftIcon) && (
      <div className="block items-center justify-center">
        {Boolean(text) && <div className=" px-2" />}
        <LeftIcon className="dark:brightness-0 dark:invert-[1]" />
      </div>
    )}
    {Boolean(text) && (
      <div className="pl-2">
        <div className="">{text}</div>
      </div>
    )}
  </button>
);

export default BlogButton;
