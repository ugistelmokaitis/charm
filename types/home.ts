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
  skills: skillsProps;
}>;

type skillsProps = GroupField<{
  skill: RichTextField;
}>;
