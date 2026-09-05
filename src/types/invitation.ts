export interface FamilyMember {
  parents: string;
  role: string;
}

export interface BankAccount {
  relation: string;
  name: string;
  bank: string;
  number: string;
}

export interface AccountGroup {
  groom: BankAccount[];
  bride: BankAccount[];
}

export interface CarRoute {
  title: string;
  steps: string[];
}

export interface SubwayLine {
  name: string;
  icon: string;
}

export interface BusLine {
  label: string;
  icon: string;
  text: string;
}

export interface LocationInfo {
  name: string;
  mapSearchName: string;
  address: string;
  subwayLines: SubwayLine[];
  subwayDetail: string;
  busStop: string;
  busLines: BusLine[];
  carRoutes: CarRoute[];
  navAddress: string;
  parking: string;
  latitude: number;
  longitude: number;
}

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export interface InvitationContent {
  couple: {
    groomName: string;
    brideName: string;
  };
  weddingDateISO: string;
  weddingDateDisplay: string;
  weddingTimeDisplay: string;
  venue: LocationInfo;
  greeting: {
    message: string;
    groomFamily: FamilyMember;
    brideFamily: FamilyMember;
  };
  flowerWreathNote: string;
  heroImage: string;
  closingImage: string;
  accounts: AccountGroup;
  venueGuide: VenueGuideTab[];
  galleryImages: GalleryImage[];
  shareLinkBase: string;
  shareTitle: string;
  shareImage: string;
  kakaoJsKey: string;
}

export interface VenueGuidePhotoTab {
  type: "photo";
  id: string;
  label: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
}

export interface VenueGuideInfoItem {
  title: string;
  text: string;
}

export interface VenueGuideInfoTab {
  type: "info";
  id: string;
  label: string;
  items: VenueGuideInfoItem[];
}

export type VenueGuideTab = VenueGuidePhotoTab | VenueGuideInfoTab;

export interface GuestInfo {
  name: string;
}
