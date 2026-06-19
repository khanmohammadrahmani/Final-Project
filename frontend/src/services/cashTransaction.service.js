import API from "./api";

class CashTransactionService {
  getAll() {
    return API.get("/cash-transactions");
  }

  getById(id) {
    return API.get(`/cash-transactions/${id}`);
  }

  create(data) {
    return API.post("/cash-transactions", data);
  }

  update(id, data) {
    return API.put(`/cash-transactions/${id}`, data);
  }

  delete(id) {
    return API.delete(`/cash-transactions/${id}`);
  }
}

export default new CashTransactionService();
