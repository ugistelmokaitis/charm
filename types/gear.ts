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
  introDescription: KeyTextField;
  devices: DevicesProps;
  deviceTitle: KeyTextField;
  deviceDescription: KeyTextField;
  setup: SetupProps;
  setupTitle: KeyTextField;
  setupDescription: KeyTextField;
  peripherals: PeripheralProps;
  peripheralTitle: KeyTextField;
  peripheralDescription: KeyTextField;
  software: SoftwareProps;
  softwareTitle: KeyTextField;
  softwareTitleDescription: KeyTextField;
}>;

type SetupProps = GroupField<{
  setupImage: ImageField;
  setupDetails: KeyTextField;
}>;

type DevicesProps = GroupField<{
  deviceImage: ImageField;
  deviceDetails: KeyTextField;
}>;

type PeripheralProps = GroupField<{
  peripheralImage: ImageField;
  peripheralDetails: KeyTextField;
}>;

type SoftwareProps = GroupField<{
  softwareIcon: ImageField;
  softwareTitle: RichTextField;
  softwareDescription: RichTextField;
}>;
