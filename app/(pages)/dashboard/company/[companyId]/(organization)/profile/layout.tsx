import React, { Suspense } from "react";
import { AccessGuardProvider } from "./(ui)/features/";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewHolder } from "./(ui)/components";

interface Props {
  children: React.ReactNode;
  authority: React.ReactNode;
  address: React.ReactNode;
  trade: React.ReactNode;
  documents: React.ReactNode;
  breadcrumbs: React.ReactNode;
  viewSelect: React.ReactNode;
}
export default function OrgProfilePageLayout({
  children,
  authority,
  address,
  trade,
  documents,
  breadcrumbs,
  viewSelect,
}: Props) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Details
      </p>
      <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
        {breadcrumbs}
      </Suspense>

      <Suspense fallback={<Skeleton className="w-32 h-10" />}>
        {viewSelect}
      </Suspense>

      <Suspense fallback={<Skeleton className="w-full flex-1" />}>
        <AccessGuardProvider>
          <ViewHolder viewKey="profile">{children}</ViewHolder>

          <ViewHolder viewKey="authority">{authority}</ViewHolder>

          <ViewHolder viewKey="address">{address}</ViewHolder>

          <ViewHolder viewKey="trade">{trade}</ViewHolder>

          <ViewHolder viewKey="documents">{documents}</ViewHolder>
        </AccessGuardProvider>
      </Suspense>
    </main>
  );
}
