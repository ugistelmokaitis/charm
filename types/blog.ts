import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type BlogProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  casestudyTitle: RichTextField;
}>;

export type BlogCategoryProps = PrismicDocumentWithUID<{
  category: KeyTextField;
}>;
