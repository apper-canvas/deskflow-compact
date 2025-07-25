import React from "react";
import TaskManager from "@/components/organisms/TaskManager";
import ApperIcon from "@/components/ApperIcon";

const TaskDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">DeskFlow</h1>
          </div>
          <p className="text-secondary text-sm">
            Streamlined task management for office professionals. Stay organized, stay productive.
          </p>
        </div>

        {/* Task Manager */}
        <TaskManager />
      </div>
    </div>
  );
};

export default TaskDashboard;