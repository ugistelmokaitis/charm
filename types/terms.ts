import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type TermsProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: RichTextField;
  introDateTitle: RichTextField;
  contentDescription: RichTextField;
}>;
