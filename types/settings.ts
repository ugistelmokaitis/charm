import type {
  KeyTextField,
  ImageField,
  LinkField,
  PrismicDocumentWithUID,
  GroupField,
} from '@prismicio/types';

export type SettingsProps = PrismicDocumentWithUID<{
  siteCredit: KeyTextField;
  headerHeroLogo: ImageField;
  headerHeroLink: LinkField;
  githubSourceIcon: ImageField;
  githubSourceLink: LinkField;
  headerPrimaryButtonLabel: KeyTextField;
  headerPrimaryButtonLink: LinkField;
  lightModeIcon: ImageField;
  darkModeIcon: ImageField;
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
