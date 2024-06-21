import { create } from "zustand";
import { PersonalDetailsData } from "../Components/types";
import { AddressData } from "../Components/types";
import { OtherDetailsData } from "../Components/types";

interface RegistrationState {
    personalDetails: PersonalDetailsData | null;
    dlimage: string | null;
    consent: string | null;
    address: AddressData | null;
    otherDetails: OtherDetailsData | null;
    setPersonalDetails: (personalDetails: PersonalDetailsData) => void;
    setDLImage: (dlimage: string) => void;
    setConsent: (consent: string) => void;
    setAddress: (address: AddressData) => void;
    setOtherDetails: (otherDetails: OtherDetailsData) => void;
}

const useStore = create<RegistrationState>((set) => ({
    personalDetails: null,
    dlimage: null,
    consent: null,
    address: null,
    otherDetails: null,
    setPersonalDetails: (personalDetails) => set({ personalDetails }),
    setDLImage: (dlimage) => set({ dlimage }),
    setConsent: (consent) => set({ consent }),
    setAddress: (address) => set({ address }),
    setOtherDetails: (otherDetails) => set({ otherDetails })
}));

export default useStore;