import type { FC } from 'react';
import RightArrowIcon from '../public/icons/rightArrowIcon.svg';

const TagButton: FC = () => (
  <div className="mb-4 inline-flex items-center justify-between rounded-full bg-primary-25 py-1 px-1 pr-4 hover:bg-primary-50">
    <span className="mr-3 rounded-full bg-primary-100 px-4 py-1 text-neutral-0">
      New
    </span>
    <span className="text-neutral-100">Im Opened to Work!</span>
    <div className="ml-4">
      <RightArrowIcon />
    </div>
  </div>
);

export default TagButton;
