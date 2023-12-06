const express = require('express');
const { getTasks, getTask, addTask, deleteTask, updateTask } = require('../controllers/taskController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

//require auth for all routes
router.use(requireAuth);

//get all tasks
router.get('/', getTasks);

//get a single task
router.get('/:id', getTask);

//post a new task
router.post('/', addTask);

//delete a task
router.delete('/:id', deleteTask)

//update a task
router.patch('/:id', updateTask)

module.exports = router