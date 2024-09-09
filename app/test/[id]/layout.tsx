import React from "react";

export default function TestDynamicRouteLayout({
  params,
  children,
  profile,
  team,
}: {
  params: {
    id: string;
  };
  children: React.ReactNode;
  profile: React.ReactNode;
  team: React.ReactNode;
}) {
  console.log("Slots", profile, team);
  return (
    <div className="container flex flex-col gap-4">
      <p>Page ID: {params.id}</p>
      {children}
      {profile}
      {team}
    </div>
  );
}
