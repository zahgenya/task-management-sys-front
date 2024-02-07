import axios from 'axios';
import { Task, TaskCreateReq, status } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  try {
  const { data } = await axios.get<{ result: Task[] }>(`${apiBaseUrl}/tasks`);
  return data.result;
  } catch (err) {
    console.error("Error with fetching: ", err)
    throw err;
  }
}

const updateTask = async (id: string, method: status) => {
  try {
    const res = await axios.put(`${apiBaseUrl}/${id}/${method}`)
    return res.data
  } catch (err) {
    console.error("Error with parameters: ", err)
    throw err;
  }
}

const createNewTask = async (taskObj: TaskCreateReq) => {
  try {
    const res = await axios.post(`${apiBaseUrl}`, taskObj)
    return res.data
  } catch (err) {
    console.error("Error with task object: ", err)
    throw err
  }
}

const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${apiBaseUrl}/${id}`)
    return res.data
  } catch (err) {
    console.error("Error with id: ", err)
    throw err;
  }
}

export default {
  getAll,
  updateTask,
  createNewTask,
  deleteTask
}