import { create } from "zustand";
import api from "../services/api";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await api.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.data.message || "Get users failed");
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await api.post(
        "/message/send/" + selectedUser._id,
        messageData,
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error.response.data.message || "Sending message failed");
    }
  },
  getMessage: async (userId) => {
    console.log(userId);

    set({ isMessageLoading: true });
    try {
      const response = await api.get(`/message/${userId}`);
      console.log(response.data);

      set({ messages: response.data });
    } catch (error) {
      toast.error(error.response.data.message || "getting messages failed");
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  subscribeToMessages: () => {
    const { selectedUser } = get();
    console.log("subscribe");

    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) return;
    console.log("socket", socket);

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      console.log(newMessage.senderId, selectedUser._id);

      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
