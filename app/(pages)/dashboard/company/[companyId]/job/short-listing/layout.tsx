import React from "react";

interface Props {
  children: Readonly<React.ReactNode>;
  dataSlot: Readonly<React.ReactNode>;
}

export default function JobShortlistPageLayout({ children, dataSlot }: Props) {
  return (
    <main className="flex flex-col gap-2">
      {children}
      {dataSlot}
    </main>
  );
}
