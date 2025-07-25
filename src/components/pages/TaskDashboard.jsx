import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import TaskManager from "@/components/organisms/TaskManager";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";

const TaskDashboard = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">DeskFlow</h1>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-slate-600">
                    Welcome, {user.firstName || user.name || user.emailAddress}
                  </div>
                )}
                <Button
                  onClick={logout}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            )}
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