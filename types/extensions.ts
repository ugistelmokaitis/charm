import type {
  PrismicDocumentWithUID,
  RichTextField,
  LinkField,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type ExtensionsProps = PrismicDocumentWithUID<{
  introTitle: RichTextField;
  introDescription: RichTextField;
  extensionsTitle: RichTextField;
  socialTitle: RichTextField;
  socialDescription: RichTextField;
  socialProfile: socialProfileProps;
  extentions: ExtensionProps;
}>;

type ExtensionProps = GroupField<{
  extentionDescription: RichTextField;
  extentionTitle: RichTextField;
}>;

type socialProfileProps = GroupField<{
  socialProfileIcon: ImageField;
  socialProfileTitle: RichTextField;
  socialProfileLink: LinkField;
}>;
