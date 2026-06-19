import API from "./api";

class CustomerService {
  getAll() {
    return API.get("/customers");
  }

  getById(id) {
    return API.get(`/customers/${id}`);
  }

  create(data) {
    return API.post("/customers", data);
  }

  update(id, data) {
    return API.put(`/customers/${id}`, data);
  }

  delete(id) {
    return API.delete(`/customers/${id}`);
  }
}

export default new CustomerService();
