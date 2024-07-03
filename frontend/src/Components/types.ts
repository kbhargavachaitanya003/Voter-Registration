export interface EligibilityAndTypeData {
    isCitizen: boolean;
    isAge: boolean;
    isResident: boolean;
    isFelony: boolean;
    typeOfRegistration: string;
}

export interface PersonalDetailsData {
    voterType?: string;
    town: string;
    prefix?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    suffix?: string;
    dob?: any;
    dl?: number;
    ssn?: string;
}

export interface AddressData {
    streetNumber?: number;
    streetName?: string;
    apartUnit?: string;
    city: string;
    state?: string;
    zip?: number;
    military?: boolean;
    mStreetNumber?: number;
    mStreetName?: string;
    mApartUnit?: string;
    mTown?: string;
    mState?: string;
    mCountry?: string;
    mZip?: number;
}

export interface OtherDetailsData {
    partyName: string;
    partyEnroll: string;
    email: string;
    mobile: number;
    gender: string;
}