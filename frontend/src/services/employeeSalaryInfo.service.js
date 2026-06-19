import API from "./api";

class EmployeeSalaryInfoService {
  getAll() {
    return API.get("/employee-salaries");
  }

  getById(id) {
    return API.get(`/employee-salaries/${id}`);
  }

  create(data) {
    return API.post("/employee-salaries", data);
  }

  update(id, data) {
    return API.put(`/employee-salaries/${id}`, data);
  }

  delete(id) {
    return API.delete(`/employee-salaries/${id}`);
  }
}

export default new EmployeeSalaryInfoService();
