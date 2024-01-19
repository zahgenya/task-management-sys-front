import TaskColumn from './components/taskColumn'
import { Task } from './types'
import './index.css'
import axios from 'axios';

import { apiBaseUrl } from './constants';
import { useEffect, useState } from 'react';

import taskService from './services/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await taskService.getAll();
        console.log(tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    void fetchTasks();
  }, []);

  return (
    <TaskColumn tasks={tasks} />
  )
}

export default App
