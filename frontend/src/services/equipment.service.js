import API from "./api";

class EquipmentService {
  getAll() {
    return API.get("/equipment");
  }

  getById(id) {
    return API.get(`/equipment/${id}`);
  }

  create(data) {
    return API.post("/equipment", data);
  }

  update(id, data) {
    return API.put(`/equipment/${id}`, data);
  }

  delete(id) {
    return API.delete(`/equipment/${id}`);
  }
}

export default new EquipmentService();
