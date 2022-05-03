import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type CaseStudyProps = PrismicDocumentWithUID<{
  workpagePrefix: KeyTextField;
  workpageTitle: RichTextField;
  workpageDescriptionBold: KeyTextField;
  workpageDescriptionRegular: KeyTextField;
  contentPrefix: KeyTextField;
  contentTitle: RichTextField;
  contentImage: ImageField;
  slices2: SliceZone;
  content: ContentProps;
}>;

type ContentProps = GroupField<{
  prefix: KeyTextField;
  title: RichTextField;
  description: KeyTextField;
  primaryButtonLabel: KeyTextField;
  primaryButtonLink: KeyTextField;
}>;
