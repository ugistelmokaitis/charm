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
  <div className="col-span-5 col-start-3">
    <div className="mt-[2.875rem] lg:mt-10">
      <TwitterTweetEmbed tweetId={slice.primary.tweetId} />
    </div>
  </div>
);

export default Twitter;
