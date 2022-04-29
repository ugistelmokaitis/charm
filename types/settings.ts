import type {
  KeyTextField,
  ImageField,
  LinkField,
  PrismicDocumentWithUID,
  RichTextField,
  GroupField,
} from '@prismicio/types';

export type SettingsProps = PrismicDocumentWithUID<{
  siteCredit: KeyTextField;
  headerHeroLogo: ImageField;
  headerHeroLink: LinkField;
  headerPrimaryButtonLabel: KeyTextField;
  headerPrimaryButtonLink: LinkField;
  headerSiteMap: HeaderNavigation;
  footerSitemap: FooterNavigation;
  footerSocialMedia: footerSocialMediaProps;
}>;

type FooterNavigation = GroupField<{
  pageLabel: KeyTextField;
  pageLink: LinkField;
}>;

type footerSocialMediaProps = GroupField<{
  socialMediaIcon: ImageField;
  socialMediaLink: LinkField;
}>;

type HeaderNavigation = GroupField<{
  headerPageLabel: KeyTextField;
  headerPageLink: LinkField;
}>;
