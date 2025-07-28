import React from "react";

interface Props {
  children: React.ReactNode;
  action: React.ReactNode;
}

export default function ServiceInfoSlotLayout({ children, action }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Service Information</p>
        {action}
      </div>
      {children}
    </div>
  );
}
