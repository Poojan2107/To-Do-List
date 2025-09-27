import { Router } from 'express';
import Task from '../models/Task.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title?.trim()) return res.status(400).json({ ok: false, message: 'Title is required' });
    const task = await Task.create({ title: title.trim(), description: description || '', completed: !!completed });
    return res.status(201).json({ ok: true, message: 'Task created', data: task });
  } catch (error) {
    console.error('Create task error', error);
    return res.status(500).json({ ok: false, message: 'Failed to create task' });
  }
});

router.get('/', async (_, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.json({ ok: true, message: 'Tasks fetched', data: tasks });
  } catch (error) {
    console.error('Fetch tasks error', error);
    return res.status(500).json({ ok: false, message: 'Failed to fetch tasks' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ ok: false, message: 'Task not found' });
    return res.json({ ok: true, message: 'Task fetched', data: task });
  } catch (error) {
    console.error('Fetch task error', error);
    return res.status(500).json({ ok: false, message: 'Failed to fetch task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const update = {};
    if (title !== undefined) update.title = String(title).trim();
    if (description !== undefined) update.description = String(description);
    if (completed !== undefined) update.completed = Boolean(completed);

    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ ok: false, message: 'Task not found' });
    return res.json({ ok: true, message: 'Task updated', data: task });
  } catch (error) {
    console.error('Update task error', error);
    return res.status(500).json({ ok: false, message: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ ok: false, message: 'Task not found' });
    return res.json({ ok: true, message: 'Task deleted', data: task });
  } catch (error) {
    console.error('Delete task error', error);
    return res.status(500).json({ ok: false, message: 'Failed to delete task' });
  }
});

export default router;

