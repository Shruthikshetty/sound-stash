import { AuthPostSuccessResponse } from "@/types/route-types";
import { create } from "zustand";

type authUserData = AuthPostSuccessResponse["data"]["user"];

export interface authStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetAuth: () => void;
  user: authUserData | null;
  setUser: (user: authUserData | null) => void;
}

const initialState = {
  isLoggedIn: false,
  user: null,
};

//create auth store
export const useAuthStore = create<authStore>((set) => ({
  ...initialState,
  /**
   * handler to set isLoggedIn
   */
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  /**
   * handler to set user
   */
  setUser: (user: authUserData | null) => set({ user }),
  /**
   * reset the store
   */
  resetAuth: () => set(initialState),
}));
