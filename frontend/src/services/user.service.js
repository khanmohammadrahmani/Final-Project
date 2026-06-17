import API from "./api";

class UserService {
  getAll() {
    return API.get("/users");
  }

  getById(id) {
    return API.get(`/users/${id}`);
  }

  create(data) {
    return API.post("/users", data);
  }

  update(id, data) {
    data.append("_method", "PUT");   // 🔥 IMPORTANT FIX
    return API.post(`/users/${id}`, data);
  }

  delete(id) {
    return API.delete(`/users/${id}`);
  }
}

export default new UserService();