import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
} from '@prismicio/types';

export type TermsProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: KeyTextField;
  IntroDateTitle: KeyTextField;
  contentDescription: RichTextField;
  slices2: SliceZone;
}>;
