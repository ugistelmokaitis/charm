import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
} from '@prismicio/types';

export type CaseStudyProps = PrismicDocumentWithUID<{
  contentPrefix: KeyTextField;
  contentTitle: RichTextField;
  slices1: SliceZone;
}>;
