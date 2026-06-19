import API from "./api";

class EmpSalaryPaymentService {
  // ================= GET ALL =================
  getAll() {
    return API.get("/emp-salary-payments");
  }

  // ================= GET BY ID =================
  getById(id) {
    return API.get(`/emp-salary-payments/${id}`);
  }

  // ================= CREATE =================
  create(data) {
    return API.post("/emp-salary-payments", data);
  }

  // ================= UPDATE =================
  update(id, data) {
    return API.put(`/emp-salary-payments/${id}`, data);
  }

  // ================= DELETE =================
  delete(id) {
    return API.delete(`/emp-salary-payments/${id}`);
  }
}

export default new EmpSalaryPaymentService();
