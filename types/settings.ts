import type {
  KeyTextField,
  ImageField,
  LinkField,
  PrismicDocumentWithUID,
  RichTextField,
  GroupField,
} from '@prismicio/types';

export type SettingsProps = PrismicDocumentWithUID<{
  siteCredit: RichTextField;
  headerHeroLogo: ImageField;
  headerHeroLink: LinkField;
  headerPrimaryButtonLabel: RichTextField;
  headerPrimaryButtonLink: LinkField;
  headerSiteMap: HeaderNavigation;
  footerSitemap: FooterNavigation;
  footerSocialMedia: footerSocialMediaProps;
}>;

type FooterNavigation = GroupField<{
  pageLabel: RichTextField;
  pageLink: LinkField;
}>;

type footerSocialMediaProps = GroupField<{
  socialMediaIcon: ImageField;
  socialMediaLink: LinkField;
}>;

type HeaderNavigation = GroupField<{
  headerPageLabel: RichTextField;
  headerPageLink: LinkField;
}>;
