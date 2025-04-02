import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import RotatePhoneOverlay from "@/components/custom/rotate-phone-overlay";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <RotatePhoneOverlay /> */}
      <DashboardNavbar />
      {children}
    </>
  );
}
