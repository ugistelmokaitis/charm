import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
} from '@prismicio/types';

export type PrivacyProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: KeyTextField;
  IntroDateTitle: KeyTextField;
  introLastUpdate: KeyTextField;
  contentDescription: RichTextField;
  slices2: SliceZone;
}>;
