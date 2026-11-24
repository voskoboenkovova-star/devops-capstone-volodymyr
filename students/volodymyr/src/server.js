const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'development';

app.use(express.json());

let tasks = [
  { id: 1, title: 'Налаштувати Dockerfile та оптимізувати шари', done: true },
  { id: 2, title: 'Описати інфраструктуру EC2 у Terraform', done: true },
  { id: 3, title: 'Запустити CI/CD пайплайн через GitHub Actions', done: false }
];

app.get('/', (req, res) => {
  res.json({
    service: 'Volodymyr DevOps Capstone API',
    author: 'Volodymyr',
    environment: APP_ENV,
    endpoints: ['GET /', 'GET /health', 'GET /tasks', 'POST /tasks']
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/tasks', (req, res) => {
  res.json({ count: tasks.length, items: tasks });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Поле title є обов’язковим' });
  }
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    done: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${APP_ENV}]`);
  });
}

module.exports = app;