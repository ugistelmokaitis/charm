import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
  RichTextField,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type HomeProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  heroNameTitle: KeyTextField;
  heroGreetingTitle: KeyTextField;
  heroDescription: KeyTextField;
  experienceTitle: RichTextField;
  skillsTitle: RichTextField;
  badgeButtonPrefix: KeyTextField;
  badgeButtonLabel: KeyTextField;
  badgeButtonLink: LinkField;
  company: companyProps;
  skills: skillsProps;
}>;

type skillsProps = GroupField<{
  skill: RichTextField;
}>;

type companyProps = GroupField<{
  companyName: KeyTextField;
  companyRole: KeyTextField;
  companyYear: KeyTextField;
  companyResponsibilities: KeyTextField;
  companyTools: KeyTextField;
}>;
