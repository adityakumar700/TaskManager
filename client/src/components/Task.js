import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';

const Task = ({ task, onDragStart }) => {
  return (
    <Card 
      draggable 
      onDragStart={(e) => onDragStart(e, task.id)}
      sx={{ mb: 2, cursor: 'move' }}
    >
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ cursor: 'move' }}>
            <DragIndicator />
          </IconButton>
          <Typography variant="h6">{task.title}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;