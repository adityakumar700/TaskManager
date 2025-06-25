const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const authenticate = require('../middleware/auth');

// Get all tasks for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Create a new task
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.create({ 
      title, 
      status: status || 'To Do',
      userId: req.user.id 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update task status
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

module.exports = router;