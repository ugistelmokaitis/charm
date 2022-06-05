import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  ImageField,
  GroupField,
  DateField,
  SliceZone,
  FilledLinkToDocumentField,
} from '@prismicio/types';

export type BlogpostProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  blogTitle: RichTextField;
  blogDescription: KeyTextField;
  blogDate: string;
  blogImage: ImageField;
  blogCateogry: FilledLinkToDocumentField;
  author: AuthorProps;
  slices2: SliceZone;
}>;

type AuthorProps = GroupField<{
  name: KeyTextField;
  image: ImageField;
  role: KeyTextField;
  instagramUsername: string;
}>;
