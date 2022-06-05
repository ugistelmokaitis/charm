import type { EmbedField } from '@prismicio/types';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import type { YouTubePlayerProps } from 'react-player/youtube';

type VideoProps = {
  data: EmbedField;
} & YouTubePlayerProps;

const Video: FC<VideoProps> = ({ data, ...props }) => {
  const ReactPlayer = dynamic(
    async () =>
      import(
        /* webpackChunkName: "react-player/youtube" */
        'react-player/youtube'
      )
  );

  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{
        aspectRatio: `${data.width as number}/${data.height as number}`,
      }}
    >
      <ReactPlayer
        url={data.embed_url}
        loop
        controls={false}
        muted
        playsinline
        playing
        width="100%"
        height="100%"
        {...props}
      />
    </div>
  );
};

export default Video;