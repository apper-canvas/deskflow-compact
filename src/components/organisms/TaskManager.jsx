import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import TaskForm from "@/components/molecules/TaskForm";
import FilterBar from "@/components/molecules/FilterBar";
import TaskItem from "@/components/molecules/TaskItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  });

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "n":
            e.preventDefault();
            setShowForm(true);
            break;
          case "1":
            e.preventDefault();
            handleFilterChange("status", "active");
            break;
          case "2":
            e.preventDefault();
            handleFilterChange("status", "completed");
            break;
          case "3":
            e.preventDefault();
            handleFilterChange("status", "all");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", err);
    }
  };

const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      toast.success(updatedTask.completed ? "Task completed!" : "Task reopened!");
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error toggling task:", err);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await taskService.update(taskId, updatedData);
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status === "active" && task.completed) return false;
    if (filters.status === "completed" && !task.completed) return false;
    if (filters.priority !== "all" && task.priority !== filters.priority) return false;
    if (filters.category !== "all" && task.category !== filters.category) return false;
    return true;
  });

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      {/* Task Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Quick Add Button */}
      {!showForm && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowForm(true)}
              variant="primary"
              size="md"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Task
              <span className="ml-2 text-xs opacity-75">(Ctrl+N)</span>
            </Button>
          </div>

          <div className="hidden md:flex text-xs text-secondary gap-4">
            <div className="flex items-center gap-1">
              <kbd className="kbd">Ctrl+1</kbd>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="kbd">Ctrl+2</kbd>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="kbd">Ctrl+3</kbd>
              <span>All</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        taskCounts={taskCounts}
      />

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Empty onAddTask={() => setShowForm(true)} />
      ) : (
        <div className="task-list space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.Id}
              task={task}
              onToggle={handleToggleTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;