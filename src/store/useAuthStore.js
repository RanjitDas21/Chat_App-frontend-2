import { create } from "zustand";
import { axiosInstance } from "../config/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";


const BASE_URL = import.meta.env.VITE_SOCKET_URL || (import.meta.env.MODE === "development" ? "http://localhost:5000" : window.location.origin);


const token = localStorage.getItem('token');

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", { headers: {Authorization: `Bearer ${token}`}});
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      localStorage.setItem('token', res.data.token);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem('token', res.data.token);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout", { headers: {Authorization: `Bearer ${token}`}});
      set({ authUser: null });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      get().disconnectSocket();
      sessionStorage.removeItem("homeReloaded");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/update-profilePic", data, { headers: {Authorization: `Bearer ${token}`}});
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },


  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      transports: ["websocket"],   // ⭐ IMPORTANT
      withCredentials: true,
      auth: {
      token: token,   // <-- send JWT here
    },
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  }));