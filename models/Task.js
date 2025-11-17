//models/Task.js
const mongoose = require('mongoose');
const { title } = require('process');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now}
}, {collection: 'tasks'});

module.exports = mongoose.model('Task', taskSchema);