import API from "./api";

class EmpDocumentService {
  getAll() {
    return API.get("/emp-documents");
  }

  getById(id) {
    return API.get(`/emp-documents/${id}`);
  }

  create(data) {
    return API.post("/emp-documents", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 🔥 FIX HERE (IMPORTANT)
  update(id, data) {
    return API.post(`/emp-documents/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  delete(id) {
    return API.delete(`/emp-documents/${id}`);
  }
}

export default new EmpDocumentService();
