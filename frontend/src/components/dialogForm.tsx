import * as React from 'react';
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material';
import taskService from '../services/tasks';
import { TaskFormValues } from '../types';
import { Task } from '../types';

export default function FormDialog({ setTasks }: { setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleOpen}>
        Create New Task
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          try {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJSON = Object.fromEntries((formData as any).entries())
          const title = formJSON.title;
          const description = formJSON.description
          const taskForm: TaskFormValues = {
            title: title,
            description: description,
            status: "TODO"
          }
          await taskService.createNewTask(taskForm)
          const newTasks = await taskService.getAll();
          setTasks(newTasks);
          handleClose();
        } catch (err) {
          console.error("Error submiting form: ", err)
          throw err
        }
        }
      }}
      >

        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill all fields to add new task.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='title'
            name='title'
            label='Task Title'
            type='text'
            fullWidth
            variant='standard'
            autoComplete='off'
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            name='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            autoComplete='off'
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} data-testid="cancelButtonForm">Cancel</Button>
        <Button type='submit' data-testid="addButtonForm">Add</Button>
      </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
