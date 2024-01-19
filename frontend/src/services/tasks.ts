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

export default {
  getAll
}