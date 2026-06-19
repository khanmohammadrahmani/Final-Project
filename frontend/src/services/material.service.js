import API from "./api";

class MaterialService {
  getAll() {
    return API.get("/materials");
  }

  getById(id) {
    return API.get(`/materials/${id}`);
  }

  create(data) {
    return API.post("/materials", data);
  }

  update(id, data) {
    return API.put(`/materials/${id}`, data);
  }

  delete(id) {
    return API.delete(`/materials/${id}`);
  }
}

export default new MaterialService();
