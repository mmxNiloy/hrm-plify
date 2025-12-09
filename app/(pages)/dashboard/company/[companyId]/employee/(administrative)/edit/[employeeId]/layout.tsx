import React from "react";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  educationalInfo: React.ReactNode;
  passportInfo: React.ReactNode;
  emergencyContactInfo: React.ReactNode;
  visaBrpDetails: React.ReactNode;
  eussDbsDetails: React.ReactNode;
  nidDetails: React.ReactNode;
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
}: Props) {
  return (
    <>
      {children}
      {educationalInfo}
      {passportInfo}
      {visaBrpDetails}
      {eussDbsDetails}
      {nidDetails}
      {contactInfo}
      {emergencyContactInfo}
    </>
  );
}
