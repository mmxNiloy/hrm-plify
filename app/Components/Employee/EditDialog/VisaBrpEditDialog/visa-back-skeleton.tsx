import React from "react";

export default function VisaBackSkeleton() {
  return (
    <div className="bg-slate-500 w-full rounded-md p-4 border-2 border-muted flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
      </div>

      <span className="abolute w-full bg-black h-8 rounded-md" />

      <div className="flex items-center justify-between gap-4">
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-2 rounded-md animate-pulse" />
      </div>

      <span className="abolute w-full bg-muted h-8 animate-pulse rounded-md" />

      <div className="flex items-center justify-between">
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
        <span className="bg-muted w-1/5 h-6 rounded-md animate-pulse" />
      </div>

      <span className="bg-muted animate-pulse w-full h-4 rounded-md" />
    </div>
  );
}
