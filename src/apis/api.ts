import axios from "axios";
// const baseURL = process.env.REACT_APP_API_URL;

const baseURL = "/api";
const api = axios.create({
  baseURL,
  timeout: 5000, // 5초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// 물품 관련 API
export const itemsApi = {
  // 물품 추가
  addItem: (
    data: { name: string; cycle: number; categoryId: number },
    file: File
  ) => {
    const formData = new FormData();
    formData.append("request", JSON.stringify(data));
    formData.append("file", file);
    return api.post("/items", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 물품 전체 조회
  getAllItems: () => api.get("/items"),

  // 카테고리별 물품 조회
  getItemsByCategory: (categoryId: number) => api.get(`/items/${categoryId}`),

  // 물품 수정
  updateItem: (
    data: {
      id: number;
      newName: string;
      newCycle: number;
      isImageChanged: boolean;
      originalImageKey?: string;
    },
    file?: File
  ) => {
    const formData = new FormData();
    formData.append("request", JSON.stringify(data));
    if (file) {
      formData.append("file", file);
    }
    return api.patch("/items", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 물품 삭제
  deleteItem: (itemId: number) => api.delete(`/items/${itemId}`),
};

// 카테고리 관련 API
export const categoriesApi = {
  // 카테고리 전체 조회
  getAllCategories: () => api.get("/categories"),

  // 폴더별 카테고리 조회
  getCategoriesByFolder: (folderId: number) =>
    api.get(`/categories/${folderId}`),
};

// 폴더 관련 API
export const foldersApi = {
  // 폴더 전체 조회
  getAllFolders: () => api.get("/folders"),
};
