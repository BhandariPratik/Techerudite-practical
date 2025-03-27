import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authToken: null,
  isVerified:false,
  setAuthtoken: (token) => set({ authToken: token }),
  setIsverified:(status)=> set({isVerified:status})
}));

export default useAuthStore;
