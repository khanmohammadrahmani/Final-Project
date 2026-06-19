import API from "./api";

class PaymentService {
  getAll() {
    return API.get("/payments");
  }

  getById(id) {
    return API.get(`/payments/${id}`);
  }

  create(data) {
    return API.post("/payments", data);
  }

  update(id, data) {
    return API.put(`/payments/${id}`, data);
  }

  delete(id) {
    return API.delete(`/payments/${id}`);
  }
}

export default new PaymentService();
