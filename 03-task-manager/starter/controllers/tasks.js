const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-errors');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // we can use any of these options below but always stick to one route throughout
  res.status(200).json({ tasks });
  // res.status(200).json({tasks, amount:tasks.length})
  // res.status(200).json({ success:true, data:{tasks}, nbHits:tasks.length });
  // res.status(200).json({ status: 'success', data: { tasks } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  //any of the below would work
  res.status(200).json({ task });
  // res.status(200).send();
  // res.status(200).json({ task: null, status: 'success' });

  res.status(500).json({ msg: error });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     });

//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
  // editTask,
};
