import type {
  PrismicDocumentWithUID,
  RichTextField,
  LinkField,
  GroupField,
  ImageField,
  KeyTextField,
} from '@prismicio/types';

export type ExtensionsProps = PrismicDocumentWithUID<{
  introTitle: RichTextField;
  introDescription: KeyTextField;
  extensionsTitle: KeyTextField;
  socialTitle: KeyTextField;
  socialDescription: KeyTextField;
  socialProfile: socialProfileProps;
  extentions: ExtensionProps;
}>;

type ExtensionProps = GroupField<{
  extentionDescription: KeyTextField;
  extentionTitle: KeyTextField;
}>;

type socialProfileProps = GroupField<{
  socialProfileIcon: ImageField;
  socialProfileTitle: KeyTextField;
  socialProfileLink: LinkField;
}>;
