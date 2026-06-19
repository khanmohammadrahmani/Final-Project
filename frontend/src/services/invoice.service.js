import API from "./api";

class InvoiceService {
  getAll() {
    return API.get("/invoices");
  }

  getById(id) {
    return API.get(`/invoices/${id}`);
  }

  create(data) {
    return API.post("/invoices", data);
  }

  update(id, data) {
    return API.put(`/invoices/${id}`, data);
  }

  delete(id) {
    return API.delete(`/invoices/${id}`);
  }
}

export default new InvoiceService();
