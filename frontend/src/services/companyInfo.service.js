import API from "./api";

class CompanyInfoService {
  getAll() {
    return API.get("/company-info");
  }

  create(data) {
    return API.post("/company-info", data);
  }

  update(id, data) {
    data.append("_method", "PUT");
    return API.post(`/company-info/${id}`, data);
  }
}

export default new CompanyInfoService();