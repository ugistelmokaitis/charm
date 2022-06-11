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
    className="flex w-full items-center whitespace-nowrap rounded-lg border-2 border-neutral-15 p-5 px-3 py-[0.625rem] text-center hover:border-primary-25 hover:bg-primary-25 dark:hover:border-neutral-65 dark:hover:bg-neutral-65"
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
        <div className="ABCWhyteEdu-Medium  font-[350] text-neutral-100 dark:text-neutral-0">
          {text}
        </div>
      </div>
    )}
  </button>
);

export default BlogButton;
