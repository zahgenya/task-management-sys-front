export interface taskProps {
  tasks: Array<Task>
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}