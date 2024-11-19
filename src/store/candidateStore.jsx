import { create } from "zustand";
import axios from "axios";

// API base URL
const API_URL = import.meta.env.VITE_API_URL;

// Zustand store
const useCandidateStore = create((set) => ({
  loading: false,
  error: null,

  // Video mülakatı tamamlama (tüm bilgileri gönderme)
  submitInterview: async ({
    interviewId,
    firstName,
    lastName,
    email,
    phone,
    kvkk,
    videoUrl,
    filePath,
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/candidates/submit`, {
        interviewId,
        firstName,
        lastName,
        email,
        phone,
        kvkk,
        videoUrl,
        filePath,
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Mülakat tamamlanamadı";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));

export default useCandidateStore;
