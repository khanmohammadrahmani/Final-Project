import API from "./api";

class SupplierService {
  getAll() {
    return API.get("/suppliers");
  }

  getById(id) {
    return API.get(`/suppliers/${id}`);
  }

  create(data) {
    return API.post("/suppliers", data);
  }

  update(id, data) {
    return API.put(`/suppliers/${id}`, data);
  }

  delete(id) {
    return API.delete(`/suppliers/${id}`);
  }
}

export default new SupplierService();
