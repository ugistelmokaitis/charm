import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  ImageField,
  GroupField,
  FilledLinkToDocumentField,
} from '@prismicio/types';

export type BlogProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
}>;
