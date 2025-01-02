"use client";
import { generateAttendance } from "@/app/(server)/actions/generateAttendance";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  IAttendanceRecord,
  IAttendanceReport,
} from "@/schema/AttendanceSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { AttendanceGenerationRecordDataTableColumns } from "../../DataTable/Columns/Attendance/AttendanceGenerationRecordDataTableColumns";
import { RangedDatePicker } from "../../DatePicker/RangedDatePicker";
import { ToastSuccess } from "@/styles/toast.tailwind";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { ICompany } from "@/schema/CompanySchema";

interface Props {
  companyId: number;
  company: ICompany;
  employees: IEmployeeWithUserMetadata[];
}

export default function AttendanceGenerationTable({
  companyId,
  company,
  employees,
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<IAttendanceRecord[]>([]);
  const [employee, setEmployee] = useState<
    IEmployeeWithUserMetadata | undefined
  >();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const data = {
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        company_id: Number.parseInt(`${companyId}`),
        from_date: fd.get("datepicker_from_date") as string,
        to_date: fd.get("datepicker_to_date") as string,
      };

      setDate({
        from: new Date(data.from_date),
        to: new Date(data.to_date),
      });

      if (!date || !date.from || !date.to) {
        toast({
          title: "Date Range Error",
          description:
            "Invalid date range selected. Please select a valid date range and try again.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      const mAttendance = await generateAttendance(data);
      if (mAttendance.error) {
        toast({
          title: "Attendance Generation Failed",
          description: `Failed to generate attendance. Cause: ${mAttendance.error.message}`,
          variant: "destructive",
        });
      } else {
        setAttendance(mAttendance.data.new_records);
      }

      setLoading(false);
    },
    [companyId, date, toast]
  );

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

      doc.save(`Attendance_Report_${Date.now()}.pdf`);

      toast({
        title: "Download Complete",
        className: ToastSuccess,
      });

      setLoading(false);
    },
    [company, toast, loadImage]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-4 items-end justify-center"
      >
        <div className="flex flex-col gap-2">
          <Label className={RequiredAsterisk}>Employee</Label>
          <Select
            required
            name={"employee_id"}
            onValueChange={(e) => {
              setAttendance([]);
              setEmployee(
                employees.find((item) => `${item.employee_id}` === e)
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Employee" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an Employee</SelectLabel>
                {employees.map((item) => (
                  <SelectItem
                    key={`company-employee-${item.employee_id}`}
                    value={`${item.employee_id}`}
                  >
                    {getFullNameOfEmployee(item)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className={RequiredAsterisk}>Select a Date Range</Label>
          <RangedDatePicker name="generation_range" required requireRangeEnd />
        </div>

        <div className="flex flex-col gap-2">
          {/* Error message upon submit */}
          {/* {!date ||
            (!date.to && (
              <p className="text-red-500 text-xs">
                {!date || !date.from
                  ? "A date range is required"
                  : !date.to
                  ? "An ending date is required"
                  : ""}
              </p>
            ))} */}
          <Button className={ButtonSuccess} type="submit">
            {loading ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.check />
            )}
            {loading ? "Generating..." : "Submit"}
          </Button>
        </div>
        <Button
          type="button"
          disabled={loading || attendance.length < 1}
          onClick={() => {
            if (employee) {
              generatePdf(
                attendance.map((item) => ({
                  employees: employee,
                  attendance_date: item.attendance_date,
                  is_holiday: item.is_present == 3 ? 1 : 0,
                  is_present: item.is_present,
                }))
              );
            }
          }}
          variant={"destructive"}
          className="gap-2 rounded-full col-span-1"
        >
          <Icons.pdf /> Download PDF
        </Button>
      </form>

      <DataTable
        // showOptions={false}
        loading={loading}
        data={attendance.map((item) => ({ ...item, employee }))}
        columns={AttendanceGenerationRecordDataTableColumns}
      />
    </>
  );
}
