const Task = require('../models/taskModel');
const mongoose = require('mongoose');

//get all tasks
const getTasks = async (req, res) =>{
    const user_id = req.user._id;

    const tasks = await Task.find({user_id}).sort({createdAt: -1})

    res.status(200).json(tasks);
}

//get a single task
const getTask = async (req, res) =>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task);
}

//add a new task
const addTask = async (req,res)=>{
    const {content} = req.body;

    if(!content){
        return res.status(400).json({error: 'Task cannot be empty!'})
    }

    try{
        const user_id = req.user._id;
        const task = await Task.create({content, user_id});
        res.status(200).json(task);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete an task
const deleteTask = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})
   
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task);
}

//update a workout
const updateTask = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task);
}

module.exports = {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask 
}