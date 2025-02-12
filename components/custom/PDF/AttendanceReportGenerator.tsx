"use client";
import React, { useCallback, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { dateDiffInDays, getFullNameOfEmployee } from "@/utils/Misc";
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
            const size = 256; // Circle size
            canvas.width = size;
            canvas.height = size;

            // Ensure the image fits the circle without distortion
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.clip();
            ctx.fillStyle = "white"; // Background fill to avoid transparency issues
            ctx.fillRect(0, 0, size, size);

            const aspectRatio = logoImage.width / logoImage.height;
            let drawWidth = size,
              drawHeight = size;

            if (aspectRatio > 1) {
              // Image is wider than tall
              drawHeight = size / aspectRatio;
            } else {
              // Image is taller than wide
              drawWidth = size * aspectRatio;
            }

            const xOffset = (size - drawWidth) / 2;
            const yOffset = (size - drawHeight) / 2;
            ctx.drawImage(logoImage, xOffset, yOffset, drawWidth, drawHeight);

            // Add the image to the PDF
            const base64Image = canvas.toDataURL("image/png");
            doc.addImage(base64Image, "PNG", 90, 10, 30, 30);
          }
        } catch (error) {
          // console.error("Failed to load the company logo:", error);
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

      // Group data by employee
      const groupedData = data.reduce<Record<string, IAttendanceReport[]>>(
        (acc, record) => {
          const employeeId = record.employees?.employee_id ?? "Unknown";
          if (!acc[employeeId]) acc[employeeId] = [];
          acc[employeeId].push(record);
          return acc;
        },
        {}
      );

      let currentY = 90; // Start position for employee sections

      for (const [employeeId, records] of Object.entries(groupedData)) {
        const employee = records[0]?.employees;
        const employeeName = employee
          ? getFullNameOfEmployee(employee)
          : "Employee Name Not Available";
        const numberOfAttendance = records.filter(
          (r) => r.is_present == 1
        ).length;
        const numberOfAbsences = records.filter(
          (r) => r.is_present == 0
        ).length;
        const numberOfHolidays = records.filter(
          (r) => r.is_present == 3
        ).length;

        // Employee Details Section
        doc.setFontSize(12);
        doc.text(`Employee Details:`, 14, currentY);
        doc.setFontSize(10);
        doc.text(`Full Name: ${employeeName}`, 14, currentY + 7);
        doc.text(
          `Designation: ${employee?.designations?.designation_name ?? "N/A"}`,
          14,
          currentY + 12
        );
        doc.text(
          `Number of Attendance: ${numberOfAttendance}`,
          14,
          currentY + 17
        );
        doc.text(`Number of Absences: ${numberOfAbsences}`, 14, currentY + 22);
        doc.text(`Number of Holidays: ${numberOfHolidays}`, 14, currentY + 27);

        // Table Headers (Removed Employee Name)
        const headers = [
          { id: "sl-no", name: "SL No" },
          { id: "attendance_date", name: "Date" },
          { id: "is_present", name: "Status" },
        ];
        const columns = headers.map((header) => header.name);

        // Generate rows dynamically based on column definitions
        const rows = records.map((row, index) => {
          const isPresent = row.is_present;
          const status =
            isPresent == 0
              ? "Absent"
              : isPresent == 1
              ? "Present"
              : isPresent == 2
              ? "Day Off"
              : "Holiday";
          const bgColor =
            isPresent == 0
              ? [250, 17, 23]
              : isPresent == 1
              ? [11, 255, 7]
              : [78, 133, 250];

          return [
            row.record_id, // SL No
            new Date(row.attendance_date).toLocaleDateString("en-GB"), // Date
            {
              content: status,
              styles: { fillColor: bgColor, textColor: [255, 255, 255] },
            }, // Status
          ];
        });

        let finalY = currentY + 35;

        // Add table using jsPDF-Autotable
        autoTable(doc, {
          startY: currentY + 35,
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
            2: { halign: "center" }, // Align "Status" column to center
          },
          didDrawPage: (data) => {
            finalY = data.cursor?.y ?? currentY + 35;
          },
        });

        // Update currentY position for next employee
        currentY = finalY + 10;

        // Add page break if required
        if (currentY > 260) {
          doc.addPage();
          currentY = 20;
        }
      }

      doc.save(`Attendance_Report_${Date.now()}.pdf`);

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

      generatePdf(
        reports.data.sort(
          (report1, report2) =>
            new Date(report1.attendance_date).getTime() -
            new Date(report2.attendance_date).getTime()
        )
      );
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
