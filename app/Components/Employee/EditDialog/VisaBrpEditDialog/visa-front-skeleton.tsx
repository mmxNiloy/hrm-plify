import React from "react";

export default function VisaFrontSkeleton() {
  return (
    <div className="bg-slate-500 size-full rounded-md p-4 border-2 border-muted flex flex-col gap-4">
      <div className="flex items-center justify-between px-8">
        <span className="bg-amber-500 size-10 rounded-md animate-pulse" />
        <span className="bg-muted w-14 h-10 rounded-md animate-pulse" />
      </div>
      <div className="flex items-center justify-between">
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <span className="bg-muted w-1/5 h-4 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-4 rounded-md animate-pulse" />
      </div>

      <span className="flex-grow" />

      <span className="bg-muted animate-pulse w-2/5 h-2 rounded-md" />
    </div>
  );
}
