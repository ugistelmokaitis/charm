import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  SliceZone,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type CaseStudyProps = PrismicDocumentWithUID<{
  workpagePrefix: KeyTextField;
  companyName: KeyTextField;
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  aboutCompany: KeyTextField;
  contentImage: ImageField;
  slices2: SliceZone;
  content: ContentProps;
  contentTitle: RichTextField;
  author: authorProps;
  date: string;
  technology: technologyProps;
  role: KeyTextField;
}>;

type ContentProps = GroupField<{
  prefix: KeyTextField;
  title: RichTextField;
  description: KeyTextField;
  primaryButtonLabel: KeyTextField;
  primaryButtonLink: KeyTextField;
}>;

type authorProps = GroupField<{
  name: KeyTextField;
  image: ImageField;
  twitterUsername: string;
  country: KeyTextField;
}>;

type technologyProps = GroupField<{
  title: KeyTextField;
}>;
