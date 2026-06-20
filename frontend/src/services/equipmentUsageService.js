import API from "./api";

class EquipmentUsageService {
  getAll() {
    return API.get("/equipment-usage");
  }

  getById(id) {
    return API.get(`/equipment-usage/${id}`);
  }

  create(data) {
    return API.post("/equipment-usage", data);
  }

  update(id, data) {
    return API.put(`/equipment-usage/${id}`, data);
  }

  delete(id) {
    return API.delete(`/equipment-usage/${id}`);
  }
}

export default new EquipmentUsageService();