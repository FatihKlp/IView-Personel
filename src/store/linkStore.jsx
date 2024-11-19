import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useFetchInterviewStore = create((set) => ({
  interview: null,
  loading: false,
  error: null,

  // Mülakatı link ile getirme
  fetchInterviewByLink: async (link) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/links/${link}`);
      const interview = response.data;

      // Publish kontrolü ve süresi dolmuş mu kontrolü
      if (!interview.publish) {
        set({ error: "Bu mülakat yayınlanmamıştır.", loading: false });
        return;
      }

      const currentDate = new Date();
      if (new Date(interview.expireDate) < currentDate) {
        set({ error: "Bu mülakatın süresi dolmuştur.", loading: false });
        return;
      }

      set({ interview, loading: false });
    } catch (error) {
      const errorMessage =
        error.response && error.response.status === 403
          ? error.response.data.message
          : "Mülakat bulunamadı";
      set({ error: errorMessage, loading: false });
    }
  },

  // Hata temizleme
  clearError: () => set({ error: null }),

  // State temizleme
  resetStore: () => set({ interview: null }),
}));

export default useFetchInterviewStore;