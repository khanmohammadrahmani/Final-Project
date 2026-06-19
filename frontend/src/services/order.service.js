import API from "./api";

class OrderService {
  getAll() {
    return API.get("/orders");
  }

  getById(id) {
    return API.get(`/orders/${id}`);
  }

  create(data) {
    return API.post("/orders", data);
  }

  update(id, data) {
    return API.put(`/orders/${id}`, data);
  }

  delete(id) {
    return API.delete(`/orders/${id}`);
  }
}

export default new OrderService();
