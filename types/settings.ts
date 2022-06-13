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
  hamburgerMenu: HamburgerMenuProps;
  hamburgerSocialMedia: HamburgerSocialMediaProps;
  footerBottomRightSitemap: footerBottomRightSitemapProps;
}>;

type FooterNavigation = GroupField<{
  label: KeyTextField;
  link: LinkField;
}>;

type footerSocialMediaProps = GroupField<{
  icon: ImageField;
  link: LinkField;
}>;

type HeaderNavigation = GroupField<{
  label: KeyTextField;
  link: LinkField;
}>;

type HamburgerMenuProps = GroupField<{
  label: KeyTextField;
  link: LinkField;
}>;

type HamburgerSocialMediaProps = GroupField<{
  icon: ImageField;
  link: LinkField;
}>;

type footerBottomRightSitemapProps = GroupField<{
  label: KeyTextField;
  link: LinkField;
}>;
