"use client";
import React, { useCallback, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IDutyRoster, IDutyRosterWithEditData } from "@/schema/RotaSchema";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import {
  convertTo12Hour,
  toYYYYMMDD,
  getFullNameOfEmployee,
} from "@/utils/Misc";

export default function DutyRosterReportGenerator({
  company,
  reports,
}: {
  company: ICompany;
  reports: IDutyRoster[];
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
    async (data: IDutyRoster[]) => {
      const doc = new jsPDF();

      // Add company logo if available
      if (company.logo) {
        try {
          const logoImage = await loadImage(company.logo);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const size = 256;
            canvas.width = size;
            canvas.height = size;

            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(logoImage, 0, 0, size, size);

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
      doc.text("Duty Roster Report", 14, 80);

      // Column Headers
      const headers = [
        { id: "sl-no", name: "SL No" },
        { id: "employee-name", name: "Employee Name" },
        { id: "department", name: "Department" },
        { id: "shift-name", name: "Shift Name" },
        { id: "shift-start", name: "Shift Start" },
        { id: "shift-end", name: "Shift End" },
        { id: "duty-start", name: "Duty Start" },
        { id: "duty-end", name: "Duty End" },
      ];

      const columns = headers.map((header) => header.name);

      // Generate rows dynamically
      const rows = data.map((row, index) => [
        index + 1, // SL No
        getFullNameOfEmployee(row.employees), // Employee Name
        row.departments.dpt_name, // Department
        row.shift_db.shift_name, // Shift Name
        convertTo12Hour(row.shift_db.start_time), // Shift Start
        convertTo12Hour(row.shift_db.end_time), // Shift End
        toYYYYMMDD(new Date(row.from_date)), // Duty Start
        toYYYYMMDD(new Date(row.end_date)), // Duty End
      ]);

      // Add table using jsPDF-Autotable
      autoTable(doc, {
        startY: 85,
        head: [columns],
        body: rows,
        styles: {
          fontSize: 10,
          cellPadding: 4,
        },
        headStyles: { fillColor: "#4F81BD", textColor: "#FFFFFF" },
        bodyStyles: { lineColor: "#E0E0E0", textColor: "#000000" },
        alternateRowStyles: { fillColor: "#F2F2F2" },
      });

      doc.save("Duty_Roster_Report.pdf");

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

    toast({
      title: "PDF Generated",
      description: "The download will start shortly.",
      className: ToastSuccess,
    });
    generatePdf(reports);

    setLoading(false);
  }, [generatePdf, toast, reports]);

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
