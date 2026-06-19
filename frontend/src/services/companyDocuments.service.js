import API from "./api";

class CompanyDocumentsService {
  getAll() {
    return API.get("/company-documents");
  }

  getById(id) {
    return API.get(`/company-documents/${id}`);
  }

  create(data) {
    return API.post("/company-documents", data);
  }

  // 🔥 FIXED UPDATE
  update(id, data) {
    data.append("_method", "PUT");
    return API.post(`/company-documents/${id}`, data);
  }

  delete(id) {
    return API.delete(`/company-documents/${id}`);
  }
}

export default new CompanyDocumentsService();