export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  RESUME: {
    CREATE: "/api/resume",
    GET_ALL: "/api/resume",
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    DUPLICATE: (id) => `/api/resume/${id}/duplicate`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    UPLOAD_THUMBNAIL: (id) => `/api/resume/${id}/thumbnail`,
  },

  IMAGE: {
    UPLOAD_IMAGES: "/api/auth/upload-image",
  },
};
