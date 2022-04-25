import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type PrivacyProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: RichTextField;
  IntroDateTitle: RichTextField;
  introLastUpdate: RichTextField;
  contentDescription: RichTextField;
}>;
