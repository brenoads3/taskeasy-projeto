'use strict';

const STORAGE_KEY = 'taskeasy.tasks';
const form = document.getElementById('form-create');
const input = document.getElementById('title');
const list = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-completed');

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  if (tasks.length === 0) {
    list.innerHTML = '<li>Nenhuma tarefa adicionada.</li>';
    return;
  }
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="removeTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ title, completed: false });
  saveTasks();
  renderTasks();
  input.value = '';
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearCompleted);
renderTasks();
