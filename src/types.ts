export interface taskProps {
  tasks: Array<Task>
}

export enum status {
  toDo = "TODO",
  inProgress = "INPROGRESS",
  finished = "FINISHED"
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: status;
}

export type TaskFormValues = Omit<Task, "id">;

export type TaskCreateReq = Omit<Task, "id" | "status">;