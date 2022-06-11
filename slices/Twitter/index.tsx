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
    <div className="mt-8 sm:mt-28 lg:mt-16">
      <TwitterTweetEmbed tweetId={slice.primary.tweetId} />
    </div>
  </div>
);

export default Twitter;
