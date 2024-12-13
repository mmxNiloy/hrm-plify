import React, { useCallback, useRef, useState } from "react";
import { OrgChartProps } from "./OrgChartProps";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import NodeEditDialog from "../Dialog/Organogram/NodeEditDialog";
import { useControls } from "react-zoom-pan-pinch";
import addNode from "./util/addNode";
import Link from "next/link";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { buildGraph } from "./util/buildGraph";

export default function CanvasControls({
  employees,
  tree,
  companyId,
  setOrgTree,
  setEmployees,
  designations,
  canvasRef,
  company,
}: OrgChartProps) {
  const { zoomIn, zoomOut, resetTransform, zoomToElement } = useControls();

  const [loading, setLoading] = useState<boolean>(false);

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

      // Function to load image as Promise
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = src;
          image.onload = () => resolve(image);
          image.onerror = reject;
        });
      };

      try {
        // Load the logo image
        if (company.logo) {
          const image = await loadImage(
            company.logo.replace("http:", "https:")
          );

          // Draw company logo (circular)
          doc.setFillColor(255, 255, 255); // White fill for the circle
          doc.addImage(
            image,
            "PNG",
            centerX + 10, // X position adjusted for center alignment
            30, // Y position for the logo
            imageSize,
            imageSize,
            undefined,
            "NONE"
          );

          // Draw company name with a larger gap
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text(
            company.company_name,
            centerX + imageSize + padding + gapBetweenLogoAndText, // X position next to the logo
            35 // Y position with gap
          );

          // Draw headquarters (if available)
          if (company.headquarters) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(
              `Headquarters: ${company.headquarters}`,
              centerX + imageSize + padding + gapBetweenLogoAndText,
              40
            );
          }

          // Draw contact number (if available)
          if (company.contact_number) {
            doc.text(
              `Contact: ${company.contact_number}`,
              centerX + imageSize + padding + gapBetweenLogoAndText,
              45
            );
          }

          // Draw website (if available)
          if (company.website) {
            doc.text(
              `Website: ${company.website}`,
              centerX + imageSize + padding + gapBetweenLogoAndText,
              50
            );
          }

          // Add dataUrl image at the bottom of the header
          if (dataUrl) {
            const image = await loadImage(dataUrl);
            const imageYPosition = 30 + imageSize + gapBetweenLogoAndText + 20; // Adjust the Y position for the image

            // Calculate the image's natural dimensions and scale it to fit the page width
            const maxWidth = 180; // Maximum width for the image
            const aspectRatio = image.width / image.height; // Aspect ratio of the image
            const imageWidth = Math.min(maxWidth, image.width); // Set max width constraint
            const imageHeight = imageWidth / aspectRatio; // Calculate height while preserving aspect ratio

            // Draw the image with calculated width and height
            doc.addImage(
              image,
              "PNG",
              centerX,
              imageYPosition,
              imageWidth,
              imageHeight
            );
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
    ]
  );

  const downloadItem = useCallback(async () => {
    if (canvasRef && canvasRef.current) {
      const wrapperEl = canvasRef.current.getElement();

      setLoading(true);

      const oldStyles = { ...wrapperEl.style };

      try {
        // Convert the element to an image
        wrapperEl.style.paddingTop = "1.5rem";
        wrapperEl.style.minWidth = "16rem";
        wrapperEl.style.minHeight = "16rem";
        wrapperEl.style.display = "flex";
        wrapperEl.style.alignItems = "center";
        wrapperEl.style.justifyContent = "center";

        const dataUrl = await toPng(wrapperEl, {
          cacheBust: true,
          backgroundColor: "#ffffff", // Set background to white
        });

        generatePdf(dataUrl);
      } catch (error) {
        console.error("Error capturing element:", error);
      }

      wrapperEl.style.paddingTop = oldStyles.paddingTop;
      wrapperEl.style.minWidth = oldStyles.minWidth;
      wrapperEl.style.minHeight = oldStyles.minHeight;
      wrapperEl.style.display = oldStyles.display;
      wrapperEl.style.alignItems = oldStyles.alignItems;
      wrapperEl.style.justifyContent = oldStyles.justifyContent;

      setLoading(false);
    }
  }, [canvasRef, generatePdf]);

  const saveGraph = useCallback(async () => {
    console.log("Graph before", tree);
    const g = buildGraph(tree);
    console.log("Graph after", tree);

    localStorage.setItem("organogram", JSON.stringify(Array.from(g.entries())));
  }, [tree]);

  return (
    <div className="z-10 absolute right-0 top-0 flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={() => {
          zoomIn();
        }}
        size="icon"
        title="Zoom In"
      >
        <Icons.zoomIn />
      </Button>

      <Button
        onClick={() => {
          zoomOut();
        }}
        variant="outline"
        size="icon"
        title="Zoom Out"
      >
        <Icons.zoomOut />
      </Button>

      <Button
        onClick={() => {
          resetTransform();
        }}
        variant="outline"
        size="icon"
        title="Reset"
      >
        <Icons.reset />
      </Button>

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
          <Icons.download />
        )}
      </Button>

      <NodeEditDialog
        designations={designations}
        tree={tree}
        companyId={companyId}
        employees={employees}
        asIcon
        onSubmit={({ parent, child }) => {
          if (setOrgTree && setEmployees) {
            addNode({ parent, child }, setOrgTree, setEmployees);

            // saveGraph();
          }
        }}
      />
    </div>
  );
}
