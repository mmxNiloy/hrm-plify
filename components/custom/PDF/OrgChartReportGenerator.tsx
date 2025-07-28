"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { RefObject, useCallback, useState } from "react";
import { OrgChartProps } from "../Organogram/OrgChartProps";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { OrganizationChart } from "primereact/organizationchart";
import { ICompany } from "@/schema/CompanySchema";
import { PDFDocument, rgb } from "pdf-lib";
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

  const generatePDFWithPDFLib = useCallback(
    async (wrapperEl: HTMLDivElement) => {
      try {
        // Dynamically calculate content dimensions
        const boundingBox = wrapperEl.getBoundingClientRect();
        const padding = 16;
        const scale = 2; // Adjust scale for resolution
        const canvasWidth = (boundingBox.width + 2 * padding) * scale;
        const canvasHeight = (boundingBox.height + 2 * padding) * scale;

        // Generate PNG
        const pngDataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1,
          canvasWidth,
          canvasHeight,
          backgroundColor: "#ffffff",
        });

        // Load the PNG as an array buffer
        const pngBytes = await fetch(pngDataUrl).then((res) =>
          res.arrayBuffer()
        );

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Embed the PNG image into the PDF
        const pngImage = await pdfDoc.embedPng(pngBytes);

        // Get image dimensions
        const pngDims = pngImage.scale(1); // 1x scale

        // Add a page to the PDF document
        const page = pdfDoc.addPage([pngDims.width, pngDims.height]);

        // Draw the PNG on the page
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pngDims.width,
          height: pngDims.height,
        });

        // Serialize the PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Trigger download
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `organogram_${Date.now()}.pdf`;
        link.click();
      } catch (error) {
        console.error("Error generating PDF with PDF-lib:", error);
      }
    },
    []
  );

  const downloadHighQualityImage = useCallback(
    async (wrapperEl: HTMLDivElement) => {
      try {
        // Dynamically calculate the dimensions of the content
        const boundingBox = wrapperEl.getBoundingClientRect();
        const scale = 8; // Increase scale for higher resolution (e.g., 2x)
        const padding = 16;
        const canvasWidth = (boundingBox.width + 2 * padding) * scale;
        const canvasHeight = (boundingBox.height + 2 * padding) * scale;

        // Generate the image as a PNG with high quality
        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1, // Set quality to maximum
          canvasWidth,
          canvasHeight,
          backgroundColor: "#ffffff", // White background
          skipFonts: true,
          preferredFontFormat: "woff2",
        });

        // Create a download link for the image
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `organogram_${Date.now()}.png`;
        link.click();
      } catch (error) {
        console.error("Error generating high-quality image:", error);
      }
    },
    []
  );

  const downloadItem = useCallback(async () => {
    if (canvasRef && canvasRef.current) {
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
        await generatePDFWithPDFLib(wrapperEl);
      } catch (error) {
        toast({
          title: "Failed to generate PDF",
          description:
            "Failed to generate PDF. Trying to generate PNG document.",
          className: ToastWarn,
        });
        await downloadHighQualityImage(wrapperEl);
      } finally {
        toast({
          title: "Document generated!",
          className: ToastSuccess,
        });
      }

      setLoading(false);
    }
  }, [canvasRef, downloadHighQualityImage, generatePDFWithPDFLib]);

  return (
    <Button
      onClick={downloadItem}
      disabled={loading}
      variant="outline"
      size="icon"
      title="Download"
    >
      {loading ? (
        <Icons.spinner className="animate-spin ease-in-out" />
      ) : (
        <Icons.pdf />
      )}
    </Button>
  );
}
