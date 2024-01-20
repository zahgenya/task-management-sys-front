import { Card, CardContent, Grid, Typography, List, ListItem, IconButton, Box, Button } from '@mui/material';
import { taskProps } from '../types';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskColumn = ({ tasks }: taskProps) => {
  const todoTasks = tasks.filter(task => task.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task.status === 'INPROGRESS');
  const finishedTasks = tasks.filter(task => task.status === 'FINISHED');

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              To Do
            </Typography>
            <List dense={false}>
              {todoTasks.map((task) => (
                <ListItem key={task.id}>
                  <Card variant="outlined" className='task-card'>
                    <CardContent>
                      <Typography variant="body1" color="textPrimary">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.description}
                      </Typography>
                      <Button size='small' variant='outlined' endIcon={<SendIcon />}>In Progress</Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </CardContent>
          <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton aria-label='add' title='Add task'>
                <AddTaskIcon />
          </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              In Progress
            </Typography>
            <List dense={false}>
              {inProgressTasks.map((task) => (
                <ListItem key={task.id}>
                  <Card variant="outlined" className='task-card'>
                    <CardContent>
                      <Typography variant="body1" color="textPrimary">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.description}
                      </Typography>
                      <Button size='small' variant='outlined' endIcon={<SendIcon />}>Finished</Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Finished
            </Typography>
            <List dense={false}>
              {finishedTasks.map((task) => (
                <ListItem key={task.id}>
                  <Card variant="outlined" className='task-card'>
                    <CardContent>
                      <Typography variant="body1" color="textPrimary">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.description}
                      </Typography>
                      <Button size='small' variant='outlined' endIcon={<DeleteIcon />}>Delete</Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskColumn;
