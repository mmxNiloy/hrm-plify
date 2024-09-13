import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  personalInfo: React.ReactNode;
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
  personalInfo,
  educationalInfo,
  emergencyContactInfo,
  passportInfo,
  visaBrpDetails,
  eussDbsDetails,
  nidDetails,
}: Props) {
  return (
    <main className="container grid grid-cols-2 gap-2">
      <div className="col-span-full">{children}</div>
      {/* TabList */}
      <Tabs className="col-span-full" defaultValue="personal-info">
        <TabsList className="w-full">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="educational-info">
            Educational Information
          </TabsTrigger>
          <TabsTrigger value="passport-info">Passport & VISA</TabsTrigger>
          <TabsTrigger value="euss-dbs-info">EUSS & DBS</TabsTrigger>
          <TabsTrigger value="nid-info">NID Information</TabsTrigger>
          <TabsTrigger value="contact-info">Contact Information</TabsTrigger>
          <TabsTrigger value="emergency-contact-info">
            Emergency Contact Information
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">{personalInfo}</TabsContent>

        <TabsContent value="educational-info">{educationalInfo}</TabsContent>

        <TabsContent value="passport-info">
          <div className="flex flex-col gap-4">
            {passportInfo}
            {visaBrpDetails}
          </div>
        </TabsContent>

        <TabsContent value="euss-dbs-info">{eussDbsDetails}</TabsContent>

        <TabsContent value="nid-info">{nidDetails}</TabsContent>

        <TabsContent value="contact-info">{contactInfo}</TabsContent>

        <TabsContent value="emergency-contact-info">
          {emergencyContactInfo}
        </TabsContent>
      </Tabs>
    </main>
  );
}
