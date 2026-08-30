export interface FamilyMember {
  parents: string;
  role: string;
}

export interface BankAccount {
  who: string;
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

export interface LocationInfo {
  name: string;
  address: string;
  subway: string;
  busStop: string;
  busLines: string[];
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
  galleryImages: GalleryImage[];
  shareLinkBase: string;
}

export interface GuestInfo {
  name: string;
}
