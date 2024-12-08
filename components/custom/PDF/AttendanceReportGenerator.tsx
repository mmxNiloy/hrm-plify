"use client";
import React, { useCallback, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { useToast } from "@/components/ui/use-toast";
import { getAllAttendanceReports } from "@/app/(server)/actions/getAllAttendanceReports";
import { AttendanceReportFilter } from "@/utils/AttendanceReportFunctions";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function AttendanceReportGenerator({
  company,
  filters,
}: {
  company: ICompany;
  filters?: AttendanceReportFilter;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const loadImage = useCallback(
    (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      }),
    []
  );

  const generatePdf = useCallback(
    async (data: IAttendanceReport[]) => {
      const doc = new jsPDF();

      // Add company logo if available
      if (company.logo) {
        try {
          const logoImage = await loadImage(company.logo);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const size = 30; // Circle size
            canvas.width = size;
            canvas.height = size;

            // Draw circular clipped image
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(logoImage, 0, 0, size, size);

            // Add the image to the PDF
            const base64Image = canvas.toDataURL("image/png");
            doc.addImage(base64Image, "PNG", 90, 10, 30, 30);
          }
        } catch (error) {
          console.error("Failed to load the company logo:", error);
        }
      }

      // Add company details
      doc.setFontSize(14);
      doc.text(company.company_name, 105, 50, { align: "center" });
      doc.setFontSize(10);
      doc.text(company.headquarters || "Address Not Available", 105, 55, {
        align: "center",
      });
      doc.text(company.website || "Website Not Available", 105, 60, {
        align: "center",
      });
      doc.text(company.contact_number || "Contact Not Available", 105, 65, {
        align: "center",
      });

      // Title
      doc.setFontSize(16);
      doc.text("Attendance Report", 14, 80);

      // Column Headers
      const headers = [
        { id: "sl-no", name: "SL No" },
        { id: "employee-name", name: "Employee" },
        { id: "attendance_date", name: "Date" },
        { id: "is_present", name: "Status" },
      ];

      const columns = headers.map((header) => header.name);

      // Generate rows dynamically based on column definitions
      const rows = data.map((row, index) => {
        const isPresent = row.is_present;
        const status =
          isPresent === 0 ? "Absent" : isPresent === 1 ? "Present" : "Holiday";
        const bgColor =
          isPresent === 0
            ? [255, 0, 0] // Red for absent
            : isPresent === 1
            ? [0, 255, 0] // Green for present
            : [0, 0, 255]; // Blue for holiday

        return [
          index + 1, // SL No
          row.employees
            ? getFullNameOfEmployee(row.employees)
            : "Data Not Found", // Employee
          new Date(row.attendance_date).toLocaleDateString("en-GB"), // Date
          {
            content: status,
            styles: { fillColor: bgColor, textColor: [255, 255, 255] },
          }, // Status
        ];
      });

      // Add table using jsPDF-Autotable
      autoTable(doc, {
        startY: 85,
        head: [columns],
        //@ts-ignore
        body: rows,
        styles: {
          fontSize: 10,
          cellPadding: 4,
        },
        headStyles: { fillColor: "#4F81BD", textColor: "#FFFFFF" },
        bodyStyles: { lineColor: "#E0E0E0", textColor: "#000000" },
        alternateRowStyles: { fillColor: "#F2F2F2" },
        columnStyles: {
          3: { halign: "center" }, // Align "Status" column to center
        },
      });

      doc.save("Attendance_Report.pdf");

      toast({
        title: "Download Complete",
        className: ToastSuccess,
      });

      setLoading(false);
    },
    [company, toast, loadImage]
  );

  const handleClick = useCallback(async () => {
    setLoading(true);

    const reports = await getAllAttendanceReports({
      company_id: company.company_id,
      page: 1,
      limit: 10,
      filters,
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
  }, [company, filters, generatePdf, toast]);

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
