import React from 'react';
import { Box, Typography } from '@mui/material';
import Task from './Task';

const TaskColumn = ({ status, tasks, onDragStart, onDrop }) => {
  const filteredTasks = tasks.filter(task => task.status === status);
  
  const statusColors = {
    'To Do': '#f0f0f0',
    'In Progress': '#fff3e0',
    'Done': '#e8f5e9'
  };

  return (
    <Box 
      sx={{ 
        flex: 1, 
        p: 2, 
        m: 1, 
        backgroundColor: statusColors[status],
        borderRadius: 1,
        minHeight: '60vh'
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {status}
      </Typography>
      {filteredTasks.map(task => (
        <Task key={task.id} task={task} onDragStart={onDragStart} />
      ))}
    </Box>
  );
};

export default TaskColumn;