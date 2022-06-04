import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { EmbedField } from '@prismicio/types';
import Video from '../../components/video';

const MediaPlayer: FC<
  SliceComponentProps<{
    slice_type: 'mediaplayer';
    primary: {
      video: EmbedField;
    };
  }>
> = ({ slice }) => (
  <div className="grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-6 lg:grid">
    <div className="col-span-12 col-start-1 mt-20 sm:mt-28">
      {slice.primary.video.embed_url && (
        <Video
          data={slice.primary.video}
          loop
          playsinline
          controls={false}
          muted
        />
      )}
    </div>
  </div>
);

export default MediaPlayer;
