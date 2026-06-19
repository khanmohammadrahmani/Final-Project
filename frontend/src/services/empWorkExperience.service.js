import API from "./api";

class EmpWorkExperienceService {
  getAll() {
    return API.get("/emp-work-experience");
  }

  getById(id) {
    return API.get(`/emp-work-experience/${id}`);
  }

  create(data) {
    return API.post("/emp-work-experience", data);
  }

  update(id, data) {
    return API.put(`/emp-work-experience/${id}`, data);
  }

  delete(id) {
    return API.delete(`/emp-work-experience/${id}`);
  }
}

export default new EmpWorkExperienceService();