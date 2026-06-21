import API from "./api";

class EmployeeService {
  getAll() {
    return API.get("/employees");
  }
}

export default new EmployeeService();