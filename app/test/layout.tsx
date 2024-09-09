import React from "react";

export default function ExamplePageLayout({
  children,
  profile,
  team,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      {/* <div className="bg-blue-500 p-8">{profile}</div>
      <div className="bg-red-500 p-8">{team}</div> */}
    </div>
  );
}
