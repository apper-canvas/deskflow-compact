import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="CheckSquare" className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No tasks yet
      </h3>
      
      <p className="text-secondary text-sm mb-6 max-w-md">
        Start organizing your day by adding your first task. Use keyboard shortcuts for lightning-fast task management.
      </p>
      
      <Button onClick={onAddTask} variant="primary" size="sm">
        <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
        Add Your First Task
      </Button>
      
      <div className="mt-8 text-xs text-secondary">
        <div className="flex items-center gap-2 mb-1">
          <kbd className="kbd">Ctrl</kbd> + <kbd className="kbd">N</kbd>
          <span>Add new task</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="kbd">Ctrl</kbd> + <kbd className="kbd">Enter</kbd>
          <span>Save task</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;