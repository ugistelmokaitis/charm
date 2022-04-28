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
  heroNameTitle: RichTextField;
  heroGreetingTitle: RichTextField;
  heroDescription: RichTextField;
  experienceTitle: RichTextField;
  skillsTitle: RichTextField;
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
