import API from "./api";

// ================= GET ALL =================

const getAll = async () => {
  const response = await API.get("/employee-hiring-info");

  return response.data;
};

// ================= GET BY ID =================

const getById = async (id) => {
  const response = await API.get(`/employee-hiring-info/${id}`);

  return response.data;
};

// ================= CREATE =================

const create = async (data) => {
  const response = await API.post("/employee-hiring-info", data);

  return response.data;
};

// ================= UPDATE =================

const update = async (id, data) => {
  const response = await API.put(`/employee-hiring-info/${id}`, data);

  return response.data;
};

// ================= DELETE =================

const remove = async (id) => {
  const response = await API.delete(`/employee-hiring-info/${id}`);

  return response.data;
};

const employeeHiringInfoService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default employeeHiringInfoService;
