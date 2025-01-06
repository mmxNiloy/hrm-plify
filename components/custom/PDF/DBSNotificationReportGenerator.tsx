"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { IEmployeeDocument } from "@/schema/EmployeeSchema";
import { dateDiffInDays, getFullNameOfUser } from "@/utils/Misc";
import { addDays } from "date-fns";
import jsPDF from "jspdf";
import React, { useCallback } from "react";

export default function DBSNotificationReportGenerator({
  data,
  company,
}: {
  data: IEmployeeDocument;
  company: ICompany;
}) {
  const generateEmployeePDF = useCallback(() => {
    const diff = data.emp_euss_dbss_data?.dbs_expiry_date
      ? dateDiffInDays(
          new Date(data.emp_euss_dbss_data.dbs_expiry_date),
          new Date()
        )
      : -1;

    const doc = new jsPDF();

    const margin = 10;
    const lineHeight = 8;
    let y = margin;

    // Add border
    doc.setDrawColor(0, 123, 255);
    doc.setLineWidth(1);
    doc.rect(margin, margin, 190, 277);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(getFullNameOfUser(data.user), margin + 5, y + 10);
    y += 15;

    // Address
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const address = data.contact_information?.address_line || "N/A";
    doc.text(address, margin + 5, y);
    y += 10;

    // Date
    if (diff > 0) {
      doc.text(`Date: ${addDays(new Date(), -diff)}`, margin + 5, y);
    } else {
      doc.text(`dbs Expired!`, margin + 5, y);
    }
    y += 15;

    // Subject
    doc.setFont("helvetica", "bold");
    doc.text(
      `Subject: Right to Work Documentation - Temporary dbs ${
        diff > 0 ? `${diff}-day` : "Expired"
      } Reminder.`,
      margin + 5,
      y
    );
    y += 10;

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const content = [
      `Further to your employment on a temporary dbs, I am writing to remind you that this dbs is ${
        diff > 0 && data.emp_euss_dbss_data?.dbs_expiry_date
          ? `due to expire on ${new Date(
              data.emp_euss_dbss_data.dbs_expiry_date
            ).toLocaleDateString("en-GB")}`
          : "expired"
      }.`,
      "You are therefore requested to make arrangements to renew your right to work documentation in order for you to ",
      "remain in employment.",
    ];
    content.forEach((line) => {
      doc.text(line, margin + 5, y);
      y += lineHeight;
    });

    // List of required documents
    y += 5;
    const requiredDocs = [
      "A copy of your completed application; and",
      "Proof of postage; and/or",
      "An acknowledgement letter from the Home Office confirming receipt of your application;",
      "Where a Certificate of Application provides you with the right to work, ensure it is dated within 6 months.",
    ];
    doc.text(
      "Examples of the documents we require are as follows:",
      margin + 5,
      y
    );
    y += lineHeight;
    requiredDocs.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin + 10, y);
      y += lineHeight;
    });

    // Additional paragraphs
    const paragraphs = [
      company.company_name +
        " will complete a check with the Home Office Employer Checking Service to obtain confirmation",
      "of any application at the time of your dbs expiring or at 5 monthly intervals dependent on the checking requirements",
      "for the right to work documents you provide to us. Where a negative verification notice is received, we cannot",
      "continue to employ you, unless you are able to provide alternative evidence to satisfy us that you have the",
      "right to work.",

      "As previously advised, the immigration, Asylum and the Nationality Act 2006 requires all employers to make",
      "documentation checks at the start of every new colleague's employment. This legislation also requires employers to",
      "carry out follow-up checks where the documents provided only give a colleague the temporary right to work in the UK.",
      "This also forms part of the employment with " + company.company_name,

      "Please bring your original documents into the HR team without delay or no later than & 15 days of issuance of letter.",
      "Otherwise, we will have no option but to review your ongoing right to work when your current dbs expires. A failure to",
      "provide sufficient document evidencing your ongoing right to work in the UK could result",
      company.company_name + " taking action.",
      "Which may include considering the summary termination of your employment.",

      "Please do not hesitate to contact me if you have any concern or would like to discuss this further.",
    ];
    y += 5;
    paragraphs.forEach((line) => {
      doc.text(line, margin + 5, y);
      y += lineHeight;
    });

    // Closing text
    y += 10;
    doc.text("Yours sincerely,", margin + 5, y);
    y += lineHeight;
    doc.text(company.company_name, margin + 5, y);
    // y += lineHeight;
    // doc.text("Manager", margin + 5, y);

    // Save the PDF
    doc.save(
      `${getFullNameOfUser(data.user).replace(
        " ",
        "_"
      )}_dbs_Notification_${Date.now()}.pdf`
    );
  }, [company.company_name, data]);

  return (
    <Button size="icon" variant="ghost" onClick={generateEmployeePDF}>
      <Icons.visible />
    </Button>
  );
}
