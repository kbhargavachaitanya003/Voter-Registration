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
    submittedDate: string | null;
    submittedTime: string | null;
    referenceNumber: number | null;
    setPersonalDetails: (personalDetails: PersonalDetailsData) => void;
    setDLImage: (dlimage: string) => void;
    setConsent: (consent: string) => void;
    setAddress: (address: AddressData) => void;
    setOtherDetails: (otherDetails: OtherDetailsData) => void;
    setSubmittedDate: (submittedDate: string) => void;
    setSubmittedTime: (submittedTime: string) => void;
    setReferenceNumber: (referenceNumber: number) => void;
}

const useStore = create<RegistrationState>((set) => ({
    personalDetails: null,
    dlimage: null,
    consent: null,
    address: null,
    otherDetails: null,
    submittedDate: null,
    submittedTime: null,
    referenceNumber: null,
    setPersonalDetails: (personalDetails) => set({ personalDetails }),
    setDLImage: (dlimage) => set({ dlimage }),
    setConsent: (consent) => set({ consent }),
    setAddress: (address) => set({ address }),
    setOtherDetails: (otherDetails) => set({ otherDetails }),
    setSubmittedDate: (submittedDate) => set({ submittedDate }),
    setSubmittedTime: (submittedTime) => set({ submittedTime }),
    setReferenceNumber: (referenceNumber) => set({ referenceNumber }),
}));

export default useStore;