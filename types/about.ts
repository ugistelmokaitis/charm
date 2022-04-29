import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
  RichTextField,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type AboutProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: RichTextField;
  introParagprah: RichTextField;
  mygoToolsTitle: KeyTextField;
  moreThings: moreAboutThings;
  moreTools: moreToolsProps;
  profileImage: ImageField;
  profileName: KeyTextField;
  profileSocialsArrowLinkIcon: ImageField;
  profileLocation: KeyTextField;
  profileSocials: profileSocialsProps;
}>;

type moreAboutThings = GroupField<{
  moreThingsTitle: KeyTextField;
  moreThingsDescription: RichTextField;
}>;

type moreToolsProps = GroupField<{
  moreToolsAbout: KeyTextField;
  moreToolsTitle: KeyTextField;
  moreToolsDescription: KeyTextField;
  moreToolsImage: ImageField;
}>;

type profileSocialsProps = GroupField<{
  profileSocialsIcon: ImageField;
  profileSocialsCategory: KeyTextField;
  profileSocialsCategoryLink: LinkField;
}>;
