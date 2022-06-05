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
  <div className="col-span-10 col-start-2 text-left">
    <div className="mt-[2.875rem] lg:mt-10">
      {slice.primary.video.embed_url && (
        <Video data={slice.primary.video} muted controls />
      )}
    </div>
  </div>
);

export default MediaPlayer;
