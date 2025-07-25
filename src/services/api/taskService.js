import mockTasks from "@/services/mockData/tasks.json";

const STORAGE_KEY = "deskflow_tasks";

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
    return mockTasks;
  }
  return JSON.parse(stored);
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    const tasks = initializeStorage();
    return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay(200);
    const tasks = initializeStorage();
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(250);
    const tasks = initializeStorage();
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(200);
    const tasks = initializeStorage();
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData
    };

    tasks[taskIndex] = updatedTask;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const tasks = initializeStorage();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  }
};