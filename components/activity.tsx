import type { KeyTextField } from '@prismicio/types';
import type { FC } from 'react';
import useActivity from '../hooks/useActivity';

type ActivityProps = {
  customEmoji: KeyTextField;
  customTitle?: KeyTextField;
};

const Activity: FC<ActivityProps> = ({ customEmoji, customTitle }) => {
  const activity = useActivity();

  if (customEmoji && customTitle) {
    activity.emoji = customEmoji;
    activity.status = customTitle;
  }

  return (
    <div className="inline-flex items-center justify-between rounded-full bg-primary-25 py-1 px-1 pr-4 dark:bg-neutral-65 ">
      <span className="ABCWhyteEdu-Medium mr-3 rounded-full bg-primary-100 px-[12px] py-1  font-medium text-neutral-0">
        {activity.emoji}
      </span>
      <span className="ABCWhyteEdu-Medium font-[350] text-neutral-100 dark:text-neutral-0">
        I&apos;m currently {activity.status}
      </span>
    </div>
  );
};

export default Activity;
