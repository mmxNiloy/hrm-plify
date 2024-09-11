import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  personalInfo: React.ReactNode;
  educationalInfo: React.ReactNode;
  nextKin: React.ReactNode;
}

export default function EditEmployeeInfoByUserIdPageLayout({
  children,
  contactInfo,
  personalInfo,
  educationalInfo,
  nextKin,
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
          <TabsTrigger value="contact-info">Contact Information</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">{personalInfo}</TabsContent>

        <TabsContent value="educational-info">{educationalInfo}</TabsContent>

        <TabsContent value="contact-info">{contactInfo}</TabsContent>
      </Tabs>
    </main>
  );
}
