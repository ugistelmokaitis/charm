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
  mygoToolsTitle: RichTextField;
  moreThings: moreAboutThings;
  moreTools: moreToolsProps;
  profileImage: ImageField;
  profileName: RichTextField;
  profileSocialsArrowLinkIcon: ImageField;
  profileLocation: RichTextField;
  profileSocials: profileSocialsProps;
}>;

type moreAboutThings = GroupField<{
  moreThingsTitle: RichTextField;
  moreThingsDescription: RichTextField;
}>;

type moreToolsProps = GroupField<{
  moreToolsAbout: RichTextField;
  moreToolsTitle: RichTextField;
  moreToolsDescription: RichTextField;
  moreToolsImage: ImageField;
}>;

type profileSocialsProps = GroupField<{
  profileSocialsIcon: ImageField;
  profileSocialsCategory: RichTextField;
  profileSocialsCategoryLink: LinkField;
}>;
