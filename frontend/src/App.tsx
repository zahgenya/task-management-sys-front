import TaskColumn from './components/taskColumn'
import { Task } from './types'
import './index.css'

const tasks: Task[] = [
  { id: 1, title: 'Task 1', description: "text...", status: "TODO" },
  { id: 2, title: 'Task 2', description: "text...", status: "FINISHED" },
  { id: 3, title: 'Task 3', description: "text...", status: "INPROGRESS" },
  { id: 4, title: 'Task 4', description: "text...", status: "INPROGRESS" },
]

function App() {

  return (
    <TaskColumn tasks={tasks} />
  )
}

export default App
