import API from "./api";

class StockTransactionService {
  // Get all stock transactions
  getAll() {
    return API.get("/stock-transactions");
  }

  // Get single transaction by ID
  getById(id) {
    return API.get(`/stock-transactions/${id}`);
  }

  // Create new transaction
  create(data) {
    return API.post("/stock-transactions", data);
  }

  // Update transaction
  update(id, data) {
    return API.put(`/stock-transactions/${id}`, data);
  }

  // Delete transaction
  delete(id) {
    return API.delete(`/stock-transactions/${id}`);
  }
}

export default new StockTransactionService();
