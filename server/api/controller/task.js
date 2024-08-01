const express = require('express');
const mongoose = require('mongoose');


const userModel = mongoose.model('userModel')
const taskModel = mongoose.model('taskModel')
const addtask = async (req, res) => {
  try {
    const { title, task } = req.body;
    // console.log(title, task);
    if (!title || !task) {
      res.status(400).json({ message: "All field are required!" });
      return;
    }
    const newTask = new taskModel({ title: title, task: task, userId: req.user._id });
    await newTask.save();
    res.status(200).json({ message: "task added successfully" })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong please try again' })
  }
}

const updateTask = async (req, res) => {
  try {

    // console.log(req.params.taskid);
    const { title, task } = req.body;

    if (!title && !task) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const existingTask = await taskModel.findById(req.params.taskid);

    if (!existingTask) {
      res.status(404).json({ message: "Task not found!" });
      return;
    }
    if (existingTask.status === "complete") {
      res.status(302).json({ message: "This task is completed, You conn't modify it" })
      return;
    }

    if (existingTask.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "You are not authorized to update this task!" });
      return;
    }

    existingTask.title = title || existingTask.title;
    existingTask.task = task || existingTask.task;

    await existingTask.save();
    res.status(200).json({ message: 'Task updated successfully', task: existingTask });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params; // Destructure taskId from req.params
    // console.log("Task ID:", taskId); // Log taskId for debugging

    const existingTask = await taskModel.findById(taskId);
    // console.log("Existing Task:", existingTask); // Log the existing task for debugging

    if (!existingTask) {
      res.status(404).json({ message: "Task not found!" });
      return;
    }
    if (existingTask.status === "complete") {
      res.status(302).json({ message: "This task is completed you conn't delete it" })
      return;
    }

    if (existingTask.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "You are not authorized to delete this task!" });
      return;
    }

    await taskModel.deleteOne({ _id: taskId }); // Use deleteOne to delete the task
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error); // Optional: Log the error for debugging
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

const getTask = async (req, res) => {
  try {

    const userTasks = await taskModel.find({ userId: req.user._id });

    if (!userTasks.length) {
      res.status(404).json({ message: "No tasks found for this user!" });
      return;
    }

    res.status(200).json({ tasks: userTasks });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
const completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const existingTask = await taskModel.findById(taskId);
    if (!existingTask) {
      res.status(400).json({ message: "No tasks found!" })
      return;
    }
    if (existingTask.status === "complete") {
      res.status(300).json({ message: "Task is already completed" })
      return;
    }
    if (existingTask.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "You are not authorized to complete this task!" });
      return;
    }
    const updateTask = await taskModel.findByIdAndUpdate(taskId, { status: "complete" }, { new: true });
    res.status(200).json({ message: "task completed" });


  } catch (error) {
    req.status(500).json({ message: "something went wrong please try again leter" })
  }
}


module.exports = { addtask, updateTask, deleteTask, getTask, completeTask };
