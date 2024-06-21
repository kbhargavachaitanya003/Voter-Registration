export interface PersonalDetailsData {
    firstName: string;
    lastName: string;
    dob: any;
    dl: number;
    ssn: number;
}

export interface AddressData {
    streetNumber: number;
    streetName: string;
    apartUnit: string;
    city: string;
    state: string;
    zip: number;
}

export interface OtherDetailsData {
    partyName: string;
    partyEnroll: string;
    email: string;
    mobile: number;
    gender: string;
}