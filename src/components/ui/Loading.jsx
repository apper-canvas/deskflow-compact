import React from "react";

const Loading = () => {
  return (
    <div className="w-full space-y-4 p-6">
      {/* Loading skeleton for task input form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
          <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-8 bg-slate-200 rounded animate-pulse w-24"></div>
            <div className="h-8 bg-slate-200 rounded animate-pulse w-24"></div>
            <div className="h-8 bg-slate-200 rounded animate-pulse w-32"></div>
          </div>
        </div>
      </div>

      {/* Loading skeleton for filter bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="h-8 bg-slate-200 rounded animate-pulse w-20"></div>
        <div className="h-8 bg-slate-200 rounded animate-pulse w-24"></div>
        <div className="h-8 bg-slate-200 rounded animate-pulse w-28"></div>
      </div>

      {/* Loading skeleton for task items */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse w-16"></div>
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse w-20"></div>
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;