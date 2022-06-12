import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const Twitter: FC<
  SliceComponentProps<{
    slice_type: 'twitter';
    primary: {
      tweetId: string;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-4 col-start-5">
    <div className="mt-[3.75rem] sm:mt-[5.75rem]">
      <TwitterTweetEmbed tweetId={slice.primary.tweetId} />
    </div>
  </div>
);

export default Twitter;
