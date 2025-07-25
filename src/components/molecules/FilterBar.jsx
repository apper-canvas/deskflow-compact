import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ filters, onFilterChange, taskCounts }) => {
  const statusOptions = [
    { value: "all", label: "All", count: taskCounts.total },
    { value: "active", label: "Active", count: taskCounts.active },
    { value: "completed", label: "Completed", count: taskCounts.completed }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priority" },
    { value: "high", label: "High", icon: "AlertCircle" },
    { value: "medium", label: "Medium", icon: "Minus" },
    { value: "low", label: "Low", icon: "ArrowDown" }
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "meetings", label: "Meetings", icon: "Users" },
    { value: "emails", label: "Emails", icon: "Mail" },
    { value: "projects", label: "Projects", icon: "Folder" },
    { value: "personal", label: "Personal", icon: "User" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex flex-wrap gap-4">
        {/* Status Filter */}
        <div className="flex gap-1">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.status === option.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange("status", option.value)}
              className="relative"
            >
              {option.label}
              {option.count !== undefined && (
                <span className="ml-1 text-xs opacity-75">
                  ({option.count})
                </span>
              )}
            </Button>
          ))}
        </div>

        <div className="w-px bg-slate-200 self-stretch hidden sm:block"></div>

        {/* Priority Filter */}
        <div className="flex gap-1">
          {priorityOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.priority === option.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange("priority", option.value)}
            >
              {option.icon && (
                <ApperIcon name={option.icon} className="w-3 h-3 mr-1" />
              )}
              {option.label}
            </Button>
          ))}
        </div>

        <div className="w-px bg-slate-200 self-stretch hidden lg:block"></div>

        {/* Category Filter */}
        <div className="flex gap-1 flex-wrap">
          {categoryOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.category === option.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange("category", option.value)}
            >
              {option.icon && (
                <ApperIcon name={option.icon} className="w-3 h-3 mr-1" />
              )}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;