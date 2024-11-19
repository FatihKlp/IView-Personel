import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useVideoStore = create((set) => ({
  loading: false,
  error: null,

  // Yükleme fonksiyonu: sadece filePath döner
  uploadVideo: async (file) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/api/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const videoData = response.data.files?.[0];
      console.log("Video data:", videoData); // Yanıtı kontrol edin

      if (videoData?.fileId && videoData?.filePath) {
        // Sadece dosya adını almak için split kullanımı
        const fileName = videoData.filePath.split("/").pop(); // Örneğin: "1731619132754.mp4"

        // Dosya adı ve video ID döndürülür
        set({ loading: false });
        return { videoId: videoData.fileId, filePath: fileName };
      } else {
        throw new Error("Video yüklenemedi: filePath veya fileId eksik.");
      }
    } catch (error) {
      set({ error: "Video yüklenemedi.", loading: false });
      throw error;
    }
  },
}));

export default useVideoStore;