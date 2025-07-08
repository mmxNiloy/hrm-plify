"use client";
import React, { useCallback, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ICompany } from "@/schema/CompanySchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { getAllStaffReportsOfCompany } from "@/app/(server)/actions/getAllStaffReportsOfCompany";
import { getFullNameOfUser } from "@/utils/Misc";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function StaffReportGenerator({
  company,
}: {
  company: ICompany;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const generatePdf = useCallback(
    async (data: IEmployeeWithUserMetadata[]) => {
      const doc = new jsPDF("landscape"); // Landscape orientation for wide tables

      // Add company details
      doc.setFontSize(14);
      doc.text(company.company_name, 148, 10, { align: "center" });
      doc.setFontSize(10);
      doc.text(company.headquarters || "Address Not Available", 148, 15, {
        align: "center",
      });
      doc.text(company.website || "Website Not Available", 148, 20, {
        align: "center",
      });
      doc.text(company.contact_number || "Contact Not Available", 148, 25, {
        align: "center",
      });

      // Title
      doc.setFontSize(16);
      doc.text("Staff Report", 14, 35);

      // Column Headers
      const headers = [
        "Employee Code",
        "Employee",
        "Designation",
        "Address",
        "Date of Birth",
        "Joining Date",
        "Contact Number",
        "Nationality",
        // "NI Number",
        "Passport Number",
        "VISA/BRP Number",
        "VISA/BRP Issued",
        "VISA/BRP Expires",
      ];

      // Generate rows dynamically
      const rows = data.map((row) => [
        row.employee_code || "N/A",
        getFullNameOfUser(row.user) || "N/A",
        row.designations?.designation_name || "N/A",
        [
          row.contact_information?.address_line,
          row.contact_information?.additional_address_1,
          row.contact_information?.additional_address_2,
        ]
          .filter((item) => item)
          .join(", ") || "N/A",
        row.date_of_birth
          ? new Date(row.date_of_birth).toLocaleDateString("en-GB")
          : "N/A",
        row.date_of_joining
          ? new Date(row.date_of_joining).toLocaleDateString("en-GB")
          : "N/A",
        row.contact_number || "N/A",
        row.nationality || "N/A",
        // row.ni_num || "N/A",
        row.emp_passport?.passport_number || "N/A",
        row.visa_brp?.visa_brp_number || "N/A",
        row.visa_brp?.issue_date
          ? new Date(row.visa_brp.issue_date).toLocaleDateString("en-GB")
          : "N/A",
        row.visa_brp?.expiry_date
          ? new Date(row.visa_brp.expiry_date).toLocaleDateString("en-GB")
          : "N/A",
      ]);

      // Add table using jsPDF-Autotable
      autoTable(doc, {
        startY: 40,
        head: [headers],
        body: rows,
        styles: {
          fontSize: 7, // Further reduced font size for tighter tables
          cellPadding: 2, // Slightly reduced padding
        },
        headStyles: { fillColor: "#4F81BD", textColor: "#FFFFFF" },
        bodyStyles: { lineColor: "#E0E0E0", textColor: "#000000" },
        alternateRowStyles: { fillColor: "#F9F9F9" },
        columnStyles: {
          3: { cellWidth: 45 }, // Adjust the address column width
        },
      });

      doc.save(`Staff_Report_${Date.now()}.pdf`);

      toast({
        title: "Download Complete",
        className: ToastSuccess,
      });

      setLoading(false);
    },
    [company, toast]
  );

  const handleClick = useCallback(async () => {
    setLoading(true);

    const reports = await getAllStaffReportsOfCompany({
      companyId: company.company_id,
    });

    if (reports.error) {
      toast({
        title: "Failed to generate PDF",
        variant: "destructive",
      });
    } else {
      toast({
        title: "PDF Generated",
        description: "The download will start shortly.",
        className: ToastSuccess,
      });

      generatePdf(reports.data);
    }

    setLoading(false);
  }, [company, generatePdf, toast]);

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={"destructive"}
      className="gap-2 rounded-full"
      disabled={loading}
    >
      {loading ? (
        <Icons.spinner className="animate-spin ease-in-out" />
      ) : (
        <Icons.pdf />
      )}
      {loading ? "Processing..." : "Download PDF"}
    </Button>
  );
}
