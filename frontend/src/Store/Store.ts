import { create } from "zustand";
import { PersonalDetailsData } from "../Components/types";
import { AddressData } from "../Components/types";

interface RegistrationState {
    personalDetails: PersonalDetailsData | null;
    dlimage: string | null;
    consent: string | null;
    address: AddressData | null;
    setPersonalDetails: (personalDetails: PersonalDetailsData) => void;
    setDLImage: (dlimage: string) => void;
    setConsent: (consent: string) => void;
    setAddress: (address: AddressData) => void;
}

const useStore = create<RegistrationState>((set) => ({
    personalDetails: null,
    dlimage: null,
    consent: null,
    address: null,
    setPersonalDetails: (personalDetails) => set({ personalDetails }),
    setDLImage: (dlimage) => set({ dlimage }),
    setConsent: (consent) => set({ consent }),
    setAddress: (address) => set({ address })
}));

export default useStore;