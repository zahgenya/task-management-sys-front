import axios from 'axios';
import { Task, TaskFormValues } from '../types';

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

const updateTask = async (id: string, method: string) => {
  try {
    const res = await axios.put(`${apiBaseUrl}/${id}/${method}`)
    return res.data
  } catch (err) {
    console.error("Error with parameters: ", err)
    throw err;
  }
}

const createNewTask = async (taskObj: TaskFormValues) => {
  try {
    const res = await axios.post(`${apiBaseUrl}`, taskObj)
    return res.data
  } catch (err) {
    console.error("Error with task object: ", err)
    throw err
  }
}

export default {
  getAll,
  updateTask,
  createNewTask
}