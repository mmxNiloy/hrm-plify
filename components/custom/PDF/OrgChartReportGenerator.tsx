"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { RefObject, useCallback, useState } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { OrganizationChart } from "primereact/organizationchart";
import { ICompany } from "@/schema/CompanySchema";
import { toast } from "@/components/ui/use-toast";
import { ToastSuccess, ToastWarn } from "@/styles/toast.tailwind";

export default function OrgChartReportGenerator({
  canvasRef,
  company,
}: {
  canvasRef: RefObject<OrganizationChart | null> | undefined;
  company: ICompany;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const generatePDFWithJsPDF = useCallback(
    async (wrapperEl: HTMLDivElement) => {
      try {
        // High-resolution capture
        const scale = 2;
        const padding = 40; // Extra padding in pixels for margins

        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1,
          pixelRatio: scale,
          backgroundColor: "#ffffff",
          style: {
            padding: `${padding}px`,
          },
        });

        const img = new Image();
        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgWidth = img.width;
        const imgHeight = img.height;

        // A4 dimensions in points (1px = 0.75pt at 72dpi, but jsPDF uses 72dpi by default)
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "pt",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate scaling to fit image within page (with margins)
        const margin = 40; // 40pt margin (~0.5–0.7 inch)
        const widthRatio = (pageWidth - margin * 2) / imgWidth;
        const heightRatio = (pageHeight - margin * 2) / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);

        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;

        // Center the image
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        // Add image to PDF
        pdf.addImage(
          dataUrl,
          "PNG",
          x,
          y,
          finalWidth,
          finalHeight,
          undefined,
          "FAST" // FAST = better performance, still great quality
        );

        // Optional: Add title
        pdf.setFontSize(16);
        pdf.setTextColor(80, 80, 80);
        pdf.text(
          `${company.company_name} - Organization Chart`,
          pageWidth / 2,
          30,
          {
            align: "center",
          }
        );

        // Save the PDF
        pdf.save(
          `organogram_${company.company_name.replace(
            /[^a-zA-Z0-9]/g,
            "_"
          )}_${Date.now()}.pdf`
        );
      } catch (error) {
        console.error("Error generating PDF with jsPDF:", error);
        throw error;
      }
    },
    [company.company_name]
  );

  const downloadHighQualityImage = useCallback(
    async (wrapperEl: HTMLDivElement) => {
      try {
        const scale = 4; // Even higher for PNG export
        const padding = 40;

        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1,
          pixelRatio: scale,
          backgroundColor: "#ffffff",
          style: {
            padding: `${padding}px`,
          },
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `organogram_${company.company_name.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}_${Date.now()}.png`;
        link.click();
      } catch (error) {
        console.error("Error generating high-quality image:", error);
      }
    },
    [company.company_name]
  );

  const downloadItem = useCallback(async () => {
    if (!canvasRef?.current) {
      toast({
        title: "Organogram not ready",
        description: "Please wait for the chart to fully render.",
        className: ToastWarn,
      });
      return;
    }

    const wrapperEl = canvasRef.current.getElement();
    if (!wrapperEl) {
      toast({
        title: "Organogram element not found.",
        description: "Please ensure the organogram is rendered correctly.",
        className: ToastWarn,
      });
      return;
    }

    setLoading(true);

    try {
      await generatePDFWithJsPDF(wrapperEl);
      toast({
        title: "PDF generated successfully!",
        className: ToastSuccess,
      });
    } catch (error) {
      toast({
        title: "PDF generation failed",
        description: "Falling back to high-quality PNG download...",
        className: ToastWarn,
      });

      try {
        await downloadHighQualityImage(wrapperEl);
        toast({
          title: "PNG downloaded instead",
          description: "High-resolution image saved successfully.",
          className: ToastSuccess,
        });
      } catch (pngError) {
        toast({
          title: "Download failed",
          description: "Could not generate PDF or PNG.",
          className: ToastWarn,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [canvasRef, generatePDFWithJsPDF, downloadHighQualityImage]);

  return (
    <Button
      onClick={downloadItem}
      disabled={loading}
      variant="outline"
      size="icon"
      title="Download as PDF/PNG"
    >
      {loading ? (
        <Icons.spinner className="animate-spin ease-in-out" />
      ) : (
        <Icons.pdf />
      )}
    </Button>
  );
}
