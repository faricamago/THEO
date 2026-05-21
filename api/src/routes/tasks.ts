import { Router, Request, Response } from 'express';
import { readTasks, writeTasks } from '../utils/csvHandler.js';

const router = Router();

interface TaskBody {
  description: string;
  assignedTo: 'You' | 'Boyfriend' | 'Both';
}

router.get('/', (req: Request, res: Response) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { description, assignedTo } = req.body as TaskBody;

    if (!description || !assignedTo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const tasks = readTasks();
    const newTask = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description,
      assignedTo,
      completed: false,
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

router.patch('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].completed = completed;
    if (completed) {
      tasks[taskIndex].completedDate = new Date().toISOString().split('T')[0];
    }

    writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = readTasks();
    const filtered = tasks.filter(t => t.id !== id);

    if (filtered.length === tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    writeTasks(filtered);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
