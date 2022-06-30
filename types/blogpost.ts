import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  ImageField,
  GroupField,
  SliceZone,
  FilledLinkToDocumentField,
} from '@prismicio/types';

export type BlogpostProps = PrismicDocumentWithUID<{
  uid: string;
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  blogTitle: RichTextField;
  blogDescription: KeyTextField;
  blogDate: string;
  blogImage: ImageField;
  blogCateogry: FilledLinkToDocumentField;
  coverImage: ImageField;
  author: AuthorProps;
  country: KeyTextField;
  slices2: SliceZone;
}>;

type AuthorProps = GroupField<{
  name: KeyTextField;
  image: ImageField;
  instagramUsername: string;
}>;
