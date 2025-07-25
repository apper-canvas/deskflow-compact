import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <label className="task-checkbox cursor-pointer relative inline-flex">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div className={cn(
        "checkmark w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150",
        checked 
          ? "bg-primary border-primary text-white" 
          : "bg-white border-slate-300 hover:border-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}>
        {checked && (
          <ApperIcon name="Check" className="w-3 h-3" />
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;