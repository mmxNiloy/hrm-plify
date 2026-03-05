import React, { Suspense } from "react";
import ViewHolder from "./components/view-holder";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  educationalInfo: React.ReactNode;
  passportInfo: React.ReactNode;
  emergencyContactInfo: React.ReactNode;
  visaBrpDetails: React.ReactNode;
  eussDbsDetails: React.ReactNode;
  nidDetails: React.ReactNode;
  documents: React.ReactNode;
}

export default function EditEmployeeInfoByUserIdPageLayout({
  children,
  contactInfo,
  educationalInfo,
  emergencyContactInfo,
  passportInfo,
  visaBrpDetails,
  eussDbsDetails,
  nidDetails,
  documents,
}: Props) {
  return (
    <Suspense>
      <ViewHolder viewKey="personal-info">{children}</ViewHolder>

      <ViewHolder viewKey="education">{educationalInfo}</ViewHolder>

      <ViewHolder viewKey="passport-info">
        {passportInfo}
        {visaBrpDetails}
      </ViewHolder>

      <ViewHolder viewKey="euss">{eussDbsDetails}</ViewHolder>

      <ViewHolder viewKey="nid">{nidDetails}</ViewHolder>

      <ViewHolder viewKey="contact">
        {contactInfo}
        {emergencyContactInfo}
      </ViewHolder>

      <ViewHolder viewKey="documents">{documents}</ViewHolder>
    </Suspense>
  );
}
