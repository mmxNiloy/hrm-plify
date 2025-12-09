"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { RefObject, useCallback, useState } from "react";
import { OrgChartProps } from "../Organogram/OrgChartProps";
import { toPng } from "html-to-image";
import { OrganizationChart } from "primereact/organizationchart";
import { ICompany } from "@/schema/CompanySchema";
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";
import { toast } from "sonner";

export default function OrgChartWordGenerator({
  canvasRef,
  company,
}: {
  canvasRef: RefObject<OrganizationChart | null> | undefined;
  company: ICompany;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  // Function to load image and convert to base64
  const loadImage = useCallback((src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (err) => reject(err);
    });
  }, []);

  const generateDocx = useCallback(
    async (dataUrl: string) => {
      setLoading(true);

      try {
        // Load company logo as base64
        let companyLogo: string | null = null;
        if (company.logo) {
          companyLogo = await loadImage(company.logo);
        }

        // Create Word document
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                // Header with company logo and information
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: companyLogo
                    ? [
                        new ImageRun({
                          data: await fetch(companyLogo).then((res) =>
                            res.arrayBuffer()
                          ),
                          transformation: { width: 100, height: 100 },
                          type: "png",
                        }),
                      ]
                    : [],
                }),
                new Paragraph({
                  text: company.company_name,
                  heading: HeadingLevel.HEADING_1,
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  text: company.headquarters || "Address Not Available",
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  text: company.website || "Website Not Available",
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  text: company.contact_number || "Contact Not Available",
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({ text: "", spacing: { after: 300 } }), // Spacing before the image

                // Insert the organogram image
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new ImageRun({
                      data: await fetch(dataUrl).then((res) =>
                        res.arrayBuffer()
                      ),
                      transformation: { width: 500, height: 500 },
                      type: "png",
                    }),
                  ],
                }),
              ],
            },
          ],
        });

        // Generate the Word file
        const blob = await Packer.toBlob(doc);
        const fileName = `organogram_${Date.now()}.docx`;
        const url = URL.createObjectURL(blob);

        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
      } catch (error) {
        // console.error("Error generating Word file:", error);
        alert("Failed to generate the Word document.");
      } finally {
        setLoading(false);
      }
    },
    [company, loadImage]
  );

  const downloadItem = useCallback(async () => {
    if (canvasRef && canvasRef.current) {
      const wrapperEl = canvasRef.current.getElement();

      if (!wrapperEl) {
        toast.error("Organogram element not found.");
        return;
      }

      setLoading(true);

      const oldStyles = { ...wrapperEl.style };

      try {
        // Adjust styles for image generation
        wrapperEl.style.paddingTop = "1.5rem";
        wrapperEl.style.minWidth = "16rem";
        wrapperEl.style.minHeight = "16rem";
        wrapperEl.style.display = "flex";
        wrapperEl.style.alignItems = "center";
        wrapperEl.style.justifyContent = "center";

        // Convert the element to an image
        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          quality: 1,
          canvasHeight: 1024,
          canvasWidth: 1024,
          backgroundColor: "#ffffff", // White background
          skipFonts: true,
          preferredFontFormat: "woff2",
        });

        generateDocx(dataUrl);
      } catch (error) {
        // console.error("Error capturing element:", error);
      }

      // Restore original styles
      Object.assign(wrapperEl.style, oldStyles);

      setLoading(false);
    }
  }, [canvasRef, generateDocx]);

  return (
    <Button
      onClick={downloadItem}
      disabled={loading}
      variant="outline"
      size="icon"
      title="Download Word Document"
    >
      {loading ? (
        <Icons.spinner className="animate-spin ease-in-out" />
      ) : (
        <Icons.word />
      )}
    </Button>
  );
}
