import axios from "axios";
import { LandingPage, ConversionRequest, ConversionResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Get landing page by ID (public)
  getLandingPageById: async (id: string): Promise<LandingPage> => {
    const response = await apiClient.get(`/landing-pages/public/${id}`);
    return response.data.data;
  },

  // Handle conversion (email capture, download, etc.)
  handleConversion: async (
    id: string,
    data: ConversionRequest
  ): Promise<ConversionResponse> => {
    const response = await apiClient.post(
      `/landing-pages/public/${id}/conversion`,
      data
    );
    return response.data;
  },

  // Confirm email with token
  confirmEmail: async (token: string): Promise<any> => {
    const response = await apiClient.get(`/landing-pages/confirm/${token}`);
    return response.data;
  },

  // Send book via email
  sendBookViaEmail: async (
    token: string,
    email: string,
    format: string
  ): Promise<any> => {
    const response = await apiClient.post(`/landing-pages/send-book/${token}`, {
      email,
      format,
    });
    return response.data;
  },
};

export default apiClient;
