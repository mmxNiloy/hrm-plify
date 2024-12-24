"use server";
import CompanySearchCommand from "@/components/custom/Dashboard/Company/CompanySearchCommand";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  // const user = await getUserData();
  return {
    title: `Artemis | Dashboard | Super Admin`,
  };
}

export default async function DashboardPage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Dashboard</p>

      <div className="flex flex-col gap-2">
        <Label className="text-lg">Please Select a Company</Label>
        <CompanySearchCommand />
      </div>
    </main>
  );
}
