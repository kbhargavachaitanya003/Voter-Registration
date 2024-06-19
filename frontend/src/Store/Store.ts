import { create } from "zustand";
import { PersonalDetailsData } from "../Components/types";

interface RegistrationState {
    personalDetails: PersonalDetailsData | null;
    setPersonalDetails: (personalDetails: PersonalDetailsData) => void;
}

const useStore = create<RegistrationState>((set) => ({
    personalDetails: null,
    setPersonalDetails: (personalDetails) => set({ personalDetails })
}));

export default useStore;