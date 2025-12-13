import React from "react";

interface Props {
  children: Readonly<React.ReactNode>;
  dataSlot: Readonly<React.ReactNode>;
}

export default function JobAppliedPageLayout({ children, dataSlot }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {children}
      {dataSlot}
    </div>
  );
}
