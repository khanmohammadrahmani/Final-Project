import API from "./api";

class EquipmentMaintenanceService {
  getAll() {
    return API.get("/equipment-maintenance");
  }

  getById(id) {
    return API.get(`/equipment-maintenance/${id}`);
  }

  create(data) {
    return API.post("/equipment-maintenance", data);
  }

  update(id, data) {
    return API.put(`/equipment-maintenance/${id}`, data);
  }

  delete(id) {
    return API.delete(`/equipment-maintenance/${id}`);
  }
}

export default new EquipmentMaintenanceService();
