import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface Props {
  children: React.ReactNode;
  contactInfo: React.ReactNode;
  personalInfo: React.ReactNode;
}

export default function EditEmployeeInfoByUserIdPageLayout({
  children,
  contactInfo,
  personalInfo,
}: Props) {
  return (
    <main className="container grid grid-cols-2 gap-2">
      <div className="col-span-full">{children}</div>
      {/* TabList */}
      <Tabs className="col-span-full" defaultValue="personal-info">
        <TabsList className="w-full">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="contact-info">Contact Information</TabsTrigger>
        </TabsList>

        <TabsContent
          value="personal-info"
          className="hidden data-[state=active]:block"
          forceMount
        >
          {personalInfo}
        </TabsContent>

        <TabsContent
          value="contact-info"
          className="hidden data-[state=active]:block"
          forceMount
        >
          {contactInfo}
        </TabsContent>
      </Tabs>
    </main>
  );
}
