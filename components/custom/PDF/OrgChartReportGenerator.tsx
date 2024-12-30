"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { RefObject, useCallback, useState } from "react";
import { OrgChartProps } from "../Organogram/OrgChartProps";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { OrganizationChart } from "primereact/organizationchart";
import { ICompany } from "@/schema/CompanySchema";

export default function OrgChartReportGenerator({
  canvasRef,
  company,
}: {
  canvasRef: RefObject<OrganizationChart | null> | undefined;
  company: ICompany;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  // Function to load image as Promise
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
    async (dataUrl: string) => {
      setLoading(true);

      const doc = new jsPDF();

      // Header Section Constants
      const imageSize = 20; // Size for the logo (circular image)
      const padding = 10; // Padding between the logo and text
      const gapBetweenLogoAndText = 4; // Increased gap between logo and description
      const headerWidth = 180; // Total width allocated for header content
      const centerX = (doc.internal.pageSize.width - headerWidth) / 2; // Center position

      try {
        // Load the logo image
        if (company.logo) {
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

          // Add dataUrl image at the bottom of the header
          if (dataUrl) {
            const image = await loadImage(dataUrl);
            const imageYPosition = 30 + imageSize + gapBetweenLogoAndText + 20; // Adjust the Y position for the image

            // Calculate the image's natural dimensions and scale it to fit the page width
            const maxWidth = 180; // Maximum width for the image
            const aspectRatio = image.width / image.height; // Aspect ratio of the image
            const imageWidth = Math.min(maxWidth, image.width); // Set max width constraint
            const imageHeight = imageWidth / aspectRatio; // Calculate height while preserving aspect ratio

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const size = 1024; // Circle size
              canvas.width = size;
              canvas.height = size;

              // Draw circular clipped image
              ctx.beginPath();
              //   ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
              //   ctx.clip();
              ctx.drawImage(image, 0, 0, size, size);

              // Add the image to the PDF
              const base64Image = canvas.toDataURL("image/png");
              doc.addImage(
                base64Image,
                "PNG",
                centerX,
                imageYPosition,
                imageWidth,
                imageHeight
              );
            }

            // Draw the image with calculated width and height
            // doc.addImage(
            //   image,
            //   "PNG",
            //   centerX,
            //   imageYPosition,
            //   imageWidth,
            //   imageHeight
            // );
          }
        }

        // Save the PDF with the timestamped file name
        doc.save(`organogram_${Date.now()}.pdf`);
      } catch (error) {
        console.error("Error loading image:", error);
        alert("Failed to load the company logo image.");
      } finally {
        setLoading(false);
      }
    },
    [
      company.company_name,
      company.contact_number,
      company.headquarters,
      company.logo,
      company.website,
      loadImage,
    ]
  );

  const downloadItem = useCallback(async () => {
    if (canvasRef && canvasRef.current) {
      const wrapperEl = canvasRef.current.getElement();

      setLoading(true);

      const oldStyles = { ...wrapperEl.style };

      try {
        // Convert the element to an image
        // wrapperEl.style.paddingTop = "1.5rem";
        // wrapperEl.style.minWidth = "16rem";
        // wrapperEl.style.minHeight = "16rem";
        // wrapperEl.style.display = "flex";
        // wrapperEl.style.alignItems = "center";
        // wrapperEl.style.justifyContent = "center";

        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1,
          canvasHeight: 1024,
          canvasWidth: 1024,
          backgroundColor: "#ffffff", // Set background to white
          skipFonts: true,
          preferredFontFormat: "woff2",
        });

        generatePdf(dataUrl);
      } catch (error) {
        console.error("Error capturing element:", error);
        console.warn("Trying to capture with element id");

        try {
          const chartEl = document.getElementById("organogram-chart");
          if (!chartEl) throw new Error("Chart element not found");

          const dataUrl = await toPng(chartEl, {
            cacheBust: true,
            quality: 1,
            canvasHeight: 1024,
            canvasWidth: 1024,
            backgroundColor: "#ffffff", // Set background to white
            skipFonts: true,
            preferredFontFormat: "woff2",
          });

          generatePdf(dataUrl);
        } catch (error) {
          console.error("Error capturing element:", error);
        }
      }

      // wrapperEl.style.paddingTop = oldStyles.paddingTop;
      // wrapperEl.style.minWidth = oldStyles.minWidth;
      // wrapperEl.style.minHeight = oldStyles.minHeight;
      // wrapperEl.style.display = oldStyles.display;
      // wrapperEl.style.alignItems = oldStyles.alignItems;
      // wrapperEl.style.justifyContent = oldStyles.justifyContent;

      setLoading(false);
    }
  }, [canvasRef, generatePdf]);

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
