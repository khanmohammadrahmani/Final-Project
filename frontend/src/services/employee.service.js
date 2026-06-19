import API from "./api";

class EmployeeService {
  getAll() {
    return API.get("/employees");
  }

  getById(id) {
    return API.get(`/employees/${id}`);
  }

  create(data) {
    return API.post("/employees", data);
  }

  update(id, data) {
    data.append("_method", "PUT");
    return API.post(`/employees/${id}`, data);
  }

  delete(id) {
    return API.delete(`/employees/${id}`);
  }
}

export default new EmployeeService();