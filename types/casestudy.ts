import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
  GroupField,
} from '@prismicio/types';

export type CaseStudyProps = PrismicDocumentWithUID<{
  contentPrefix: KeyTextField;
  contentTitle: RichTextField;
  slices1: SliceZone;
  content: ContentProps;
}>;

type ContentProps = GroupField<{
  prefix: KeyTextField;
  title: RichTextField;
  description: KeyTextField;
  primaryButtonLabel: KeyTextField;
  primaryButtonLink: KeyTextField;
}>;
