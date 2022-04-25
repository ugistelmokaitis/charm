import type {
  KeyTextField,
  PrismicDocumentWithUID,
  RichTextField,
  GroupField,
  ImageField,
} from '@prismicio/types';

export type GearProps = PrismicDocumentWithUID<{
  titleTag: KeyTextField;
  metaDescription: KeyTextField;
  introTitle: RichTextField;
  introDescription: RichTextField;
  devices: DevicesProps;
  deviceTitle: RichTextField;
  deviceDescription: RichTextField;
  setup: SetupProps;
  setupTitle: RichTextField;
  setupDescription: RichTextField;
  peripherals: PeripheralProps;
  peripheralTitle: RichTextField;
  peripheralDescription: RichTextField;
  software: SoftwareProps;
  softwareTitle: RichTextField;
  softwareTitleDescription: RichTextField;
}>;

type SetupProps = GroupField<{
  setupImage: ImageField;
  setupDetails: RichTextField;
}>;

type DevicesProps = GroupField<{
  deviceImage: ImageField;
  deviceDetails: RichTextField;
}>;

type PeripheralProps = GroupField<{
  peripheralImage: ImageField;
  peripheralDetails: RichTextField;
}>;

type SoftwareProps = GroupField<{
  softwareIcon: ImageField;
  softwareTitle: RichTextField;
  softwareDescription: RichTextField;
}>;
