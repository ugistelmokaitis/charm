import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type PrivacyProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: KeyTextField;
  IntroDateTitle: KeyTextField;
  introLastUpdate: KeyTextField;
  contentDescription: RichTextField;
}>;
