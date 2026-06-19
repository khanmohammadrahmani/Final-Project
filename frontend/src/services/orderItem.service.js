import API from "./api";

class OrderItemService {
  getAll() {
    return API.get("/order-items");
  }

  getById(id) {
    return API.get(`/order-items/${id}`);
  }

  create(data) {
    return API.post("/order-items", data);
  }

  update(id, data) {
    return API.put(`/order-items/${id}`, data);
  }

  delete(id) {
    return API.delete(`/order-items/${id}`);
  }
}

export default new OrderItemService();
