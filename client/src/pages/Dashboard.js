import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskColumn from '../components/TaskColumn';
import TaskForm from '../components/TaskForm';
import authService from '../services/auth';
import taskService from '../services/tasks';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (title) => {
    try {
      await taskService.createTask({ title });
      await fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Task Manager</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
      <TaskForm onSubmit={handleAddTask} />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TaskColumn 
          status="To Do" 
          tasks={tasks} 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
        />
        <TaskColumn 
          status="In Progress" 
          tasks={tasks} 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
        />
        <TaskColumn 
          status="Done" 
          tasks={tasks} 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
        />
      </Box>
    </Box>
  );
};

export default Dashboard;