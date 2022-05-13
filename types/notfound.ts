import type {
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
  RichTextField,
} from '@prismicio/types';

export type NotFoundProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introPrefix: KeyTextField;
  introTitle: KeyTextField;
  introDescription: KeyTextField;
  primaryButtonLabel: KeyTextField;
  primaryButtonLink: LinkField;
}>;
