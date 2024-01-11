"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getTasks = void 0;
const tasks = [];
const getTasks = (_req, res) => {
    res.json(tasks);
};
exports.getTasks = getTasks;
const createTask = (req, res) => {
    const newTask = req.body;
    res.json(newTask);
};
exports.createTask = createTask;
