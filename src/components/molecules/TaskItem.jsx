import React, { useState } from "react";
import { format, isToday, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import TaskForm from "./TaskForm";

const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    onToggle(task.Id);
  };

  const handleUpdate = (updatedData) => {
    onUpdate(task.Id, updatedData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.Id);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isPast(date)) return `Overdue (${format(date, "MMM d")})`;
    return format(date, "MMM d");
  };

  const getDueDateColor = (dateString) => {
    if (!dateString) return "text-slate-500";
    const date = new Date(dateString);
    if (isPast(date) && !isToday(date)) return "text-error";
    if (isToday(date)) return "text-warning";
    return "text-slate-500";
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return "AlertCircle";
      case "medium": return "Minus";
      case "low": return "ArrowDown";
      default: return "Minus";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "meetings": return "Users";
      case "emails": return "Mail";
      case "projects": return "Folder";
      case "personal": return "User";
      default: return "Folder";
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm border border-slate-200 p-4 transition-all duration-200 hover:shadow-md hover:border-slate-300 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`text-sm font-medium break-words ${
              task.completed ? "line-through text-slate-500" : "text-slate-900"
            }`}>
              {task.title}
            </h3>
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <ApperIcon name="Edit2" className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-6 w-6 p-0 text-error hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={task.priority} className="flex items-center gap-1">
              <ApperIcon name={getPriorityIcon(task.priority)} className="w-3 h-3" />
              {task.priority}
            </Badge>

            <Badge variant={task.category} className="flex items-center gap-1">
              <ApperIcon name={getCategoryIcon(task.category)} className="w-3 h-3" />
              {task.category}
            </Badge>

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${getDueDateColor(task.dueDate)}`}>
                <ApperIcon name="Calendar" className="w-3 h-3" />
                {formatDueDate(task.dueDate)}
              </div>
            )}

            {task.completed && task.completedAt && (
              <div className="flex items-center gap-1 text-xs text-success">
                <ApperIcon name="CheckCircle" className="w-3 h-3" />
                Completed {format(new Date(task.completedAt), "MMM d")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;