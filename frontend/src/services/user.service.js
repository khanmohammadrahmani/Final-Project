import API from "./api";

class UserService {
  getAll() {
    return API.get("/users");
  }

  getById(userId) {
    return API.get(`/users/${userId}`);
  }

  create(userData) {
    return API.post("/users", userData);
  }

  update(userId, userData) {
    return API.put(`/users/${userId}`, userData);
  }

  delete(userId) {
    return API.delete(`/users/${userId}`);
  }

  login(credentials) {
    return API.post("/login", credentials);
  }
}

export default new UserService();
