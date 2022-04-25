import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type ContactProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  sharedIdeaTitle: RichTextField;
  sharedIdeaSubtitle: RichTextField;
  introPrimaryButtonLabel: RichTextField;
}>;
