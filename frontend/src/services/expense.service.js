import API from "./api";

class ExpenseService {
  getAll() {
    return API.get("/expenses");
  }

  getById(id) {
    return API.get(`/expenses/${id}`);
  }

  create(data) {
    return API.post("/expenses", data);
  }

  update(id, data) {
    return API.put(`/expenses/${id}`, data);
  }

  delete(id) {
    return API.delete(`/expenses/${id}`);
  }
}

export default new ExpenseService();
