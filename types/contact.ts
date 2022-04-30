import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  ImageField,
} from '@prismicio/types';

export type ContactProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  profileImage: ImageField;
  botProfileImage: ImageField;
  profileFullName: KeyTextField;
  introTitle: RichTextField;
  sharedIdeaTitle: RichTextField;
  sharedIdeaSubtitle: KeyTextField;
  introPrimaryButtonLabel: RichTextField;
}>;
