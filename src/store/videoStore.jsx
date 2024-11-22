import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useVideoStore = create((set) => ({
  loading: false,
  error: null,

  // Yükleme fonksiyonu: Backend'den dönen anahtar alınır
  uploadVideo: async (file) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/api/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const videoKey = response.data.key; // Backend artık sadece key döner
      if (!videoKey) throw new Error("Video yüklenemedi: Anahtar eksik.");

      set({ loading: false });
      return videoKey; // Dönen key
    } catch (error) {
      set({ error: "Video yüklenemedi.", loading: false });
      throw error;
    }
  },
}));

export default useVideoStore;