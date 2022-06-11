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
  <div className="col-span-8 col-start-3 mt-8 text-left sm:mt-28 lg:mt-16">
    <div>
      {slice.primary.video.embed_url && (
        <Video data={slice.primary.video} muted controls />
      )}
    </div>
  </div>
);

export default MediaPlayer;
