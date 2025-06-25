import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

const getTasks = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeader() });
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, { headers: getAuthHeader() });
  return response.data;
};

const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status }, { headers: getAuthHeader() });
  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTaskStatus
};