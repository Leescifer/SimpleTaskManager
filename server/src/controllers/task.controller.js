    const Task = require('../models/task.model');

    exports.index = async (req, res) => {
        try {
            const tasks = await Task.find();
            res.status(200).json({
                message: 'Success',
                data: tasks
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }

    exports.show = async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                });
            }
            res.status(200).json({
                message: 'Success',
                data: task
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }

    exports.store = async (req, res) => {
        try {
            const newTask = new Task(req.body);
            const savedTask = await newTask.save();
            res.status(201).json({
                message: 'Task created successfully',
                data: savedTask
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }

    exports.update = async (req, res) => {
        try {
            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedTask) {
                return res.status(404).json({
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                message: 'Task updated successfully',
                data: updatedTask
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }

    exports.destroy = async (req, res) => {
        try {
            const deletedTask = await Task.findByIdAndDelete(req.params.id);
            if (!deletedTask) {
                return res.status(404).json({
                    message: 'Task not found'
                });
            };

            res.status(200).json({
                message: 'Task deleted successfully'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            });
        }
    }
