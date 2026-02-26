import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const response = await api.get("/user/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in CheckAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/user/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Sign Up failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/user/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Log in failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      const response = await api.post("/user/logout");
      set({ authUser: null });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Log in failed");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await api.put("/user/update-profile", data);
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Update profile failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
