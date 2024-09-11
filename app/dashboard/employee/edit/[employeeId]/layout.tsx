import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  personalInfo: React.ReactNode;
  educationalInfo: React.ReactNode;
  passportInfo: React.ReactNode;
  emergencyContactInfo: React.ReactNode;
}

export default function EditEmployeeInfoByUserIdPageLayout({
  children,
  contactInfo,
  personalInfo,
  educationalInfo,
  emergencyContactInfo,
  passportInfo,
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
          <TabsTrigger value="passport-info">Passport Information</TabsTrigger>
          <TabsTrigger value="contact-info">Contact Information</TabsTrigger>
          <TabsTrigger value="emergency-contact-info">
            Emergency Contact Information
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">{personalInfo}</TabsContent>

        <TabsContent value="educational-info">{educationalInfo}</TabsContent>

        <TabsContent value="passport-info">{passportInfo}</TabsContent>

        <TabsContent value="contact-info">{contactInfo}</TabsContent>

        <TabsContent value="emergency-contact-info">
          {emergencyContactInfo}
        </TabsContent>
      </Tabs>
    </main>
  );
}
