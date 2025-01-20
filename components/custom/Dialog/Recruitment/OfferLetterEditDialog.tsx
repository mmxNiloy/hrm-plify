"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ICompany } from "@/schema/CompanySchema";
import { IJobApplicant } from "@/schema/JobSchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import {
  getFullNameOfApplicant,
  getFullNameOfUser,
  toCapCase,
} from "@/utils/Misc";
import jsPDF from "jspdf";
import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";
import SiteConfig from "@/utils/SiteConfig";
import { Input } from "@/components/ui/input";

interface Props {
  data: IJobApplicant;
  company: ICompany;
}

export default function OfferLetterEditDialog({ data, company }: Props) {
  const [offerLetter, setOfferLetter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>();
  const [startingDate, setStartingDate] = useState<string>();

  const contentRef = useRef<HTMLDivElement>(null);

  // TODO: Get offer letter from the server
  const getOfferLettter = useCallback(async () => {}, []);

  // Auto-generate offer letter
  const generate = useCallback(async () => {
    const jobCode = data.job?.jobCode;
    const jobTitle = toCapCase(data.job?.designation?.designation_name ?? "");
    const date = new Date().toLocaleDateString("en-GB");
    const name = getFullNameOfApplicant(data);
    const deadline = new Date(
      data.job?.lastDate ?? new Date()
    ).toLocaleDateString("en-GB");

    const letter = `${
      company.logo
        ? `![${company.company_name} - Logo](${company.logo})
    `
        : ""
    }
Ref: ${jobCode}

Date: ${date}

### Subject: Job Offer Letter for ${jobTitle} Position

### Dear,

### ${name},

Thank you for showing interest in our organization. I'm delighted to offer you the position of **${jobTitle}** at **${
      company.company_name
    }** starting on *${
      startingDate && startingDate.length > 0
        ? new Date(startingDate).toLocaleDateString("en-GB")
        : "<Insert Date Here>"
    }* (Subject to Visa Approval). 
The role will be reporting to our director and the role will be based in **${
      company.headquarters
    }**. This is a permanent position, and we'd like to offer you an annual salary of *${
      salary && salary.length > 0 ? salary : "<Insert Amount Here>"
    }*; which will be paid monthly. 
To accept the offer please sign and send it to **${
      company.website
    }** by **${deadline}** and we'll start preparing to issue a Certificate of Sponsorship.

We sincerely hope that you accept this job offer and become a valued member of our team. We believe that your skills and experience will greatly contribute to the growth and success of **${
      company.company_name
    }**.

We look forward to receiving your acceptance of this offer and welcoming you aboard.

### Best wishes,

### Director

### ${company.company_name}

---

### ${name}
`;

    setOfferLetter(letter);
  }, [
    company.company_name,
    company.headquarters,
    company.logo,
    company.website,
    data,
    salary,
    startingDate,
  ]);

  const { toast } = useToast();

  const generatePDF = useCallback(() => {
    setLoading(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 16;
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

      // Add company logo if available
      if (company.logo) {
        const img = new Image();
        img.src = company.logo;
        pdf.addImage(img, "PNG", margin, margin, pageWidth / 3, pageHeight / 8);
      }

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);

      // Add letter content manually with formatting
      let currentHeight = company.logo ? pageHeight / 8 + margin + 10 : margin;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");

      // Ref
      pdf.text(`Ref: ${data.job?.jobCode}`, margin, currentHeight);
      currentHeight += 6;

      // Date
      const date = new Date().toLocaleDateString("en-GB");
      pdf.text(`Date: ${date}`, margin, currentHeight);
      currentHeight += 6;

      // Subject
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `Subject: Job Offer Letter for ${toCapCase(
          data.job?.designation?.designation_name ?? ""
        )} Position`,
        margin,
        currentHeight
      );
      currentHeight += 12; // Add a larger gap after the subject

      // Dear [Name]
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      const name = getFullNameOfApplicant(data);
      pdf.text(`Dear,`, margin, currentHeight);
      currentHeight += 6;
      pdf.text(`${name},`, margin, currentHeight);
      currentHeight += 6;

      pdf.setFontSize(10);
      // Body of the letter
      const bodyText = `Thank you for showing interest in our organization. I'm delighted to offer you the position of **${toCapCase(
        data.job?.designation?.designation_name ?? ""
      )}** at **${company.company_name}** starting on *${
        startingDate && startingDate.length > 0
          ? new Date(startingDate).toLocaleDateString("en-GB")
          : "<Insert Date Here>"
      }* (Subject to Visa Approval). The role will be reporting to our director and the role will be based in **${
        company.headquarters
      }**. This is a permanent position, and we'd like to offer you an annual salary of *${
        salary && salary.length > 0 ? salary : "<Insert Amount Here>"
      }*; which will be paid monthly.`;

      const bodyLines = pdf.splitTextToSize(bodyText, pageWidth);

      bodyLines.forEach((line: string) => {
        // Replace **text** with bold
        const boldText = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
          pdf.setFont("helvetica", "bold");
          return p1;
        });

        // Replace *text* with italic
        const italicText = boldText.replace(/\*(.*?)\*/g, (match, p1) => {
          pdf.setFont("helvetica", "italic");
          return p1;
        });

        // Default normal font text
        pdf.setFont("helvetica", "normal");
        pdf.text(italicText, margin, currentHeight);
        currentHeight += 4; // Smaller gap for lines in a paragraph
      });

      // Add gap between paragraphs
      currentHeight += 10;

      // Deadline
      const deadline = new Date(
        data.job?.lastDate ?? new Date()
      ).toLocaleDateString("en-GB");
      const deadlineText = `To accept the offer please sign and send it to **${company.website}** by **${deadline}** and we'll start preparing to issue a Certificate of Sponsorship.`;

      const deadlineLines = pdf.splitTextToSize(deadlineText, pageWidth);
      deadlineLines.forEach((line: string) => {
        // Replace **text** with bold
        const boldText = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
          pdf.setFont("helvetica", "bold");
          return p1;
        });

        // Replace *text* with italic
        const italicText = boldText.replace(/\*(.*?)\*/g, (match, p1) => {
          pdf.setFont("helvetica", "italic");
          return p1;
        });

        // Default normal font text
        pdf.setFont("helvetica", "normal");
        pdf.text(italicText, margin, currentHeight);
        currentHeight += 4; // Smaller gap for lines in a paragraph
      });

      // Add gap between paragraphs
      currentHeight += 10;

      // Closing statement
      const closingText = `We sincerely hope that you accept this job offer and become a valued member of our team. We believe that your skills and experience will greatly contribute to the growth and success of **${company.company_name}**.`;

      const closingLines = pdf.splitTextToSize(closingText, pageWidth);
      closingLines.forEach((line: string) => {
        // Replace **text** with bold
        const boldText = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
          pdf.setFont("helvetica", "bold");
          return p1;
        });

        // Replace *text* with italic
        const italicText = boldText.replace(/\*(.*?)\*/g, (match, p1) => {
          pdf.setFont("helvetica", "italic");
          return p1;
        });

        // Default normal font text
        pdf.setFont("helvetica", "normal");
        pdf.text(italicText, margin, currentHeight);
        currentHeight += 4; // Smaller gap for lines in a paragraph
      });

      // Add gap between paragraphs
      currentHeight += 10;

      // Closing
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      const closingLineText =
        "We look forward to receiving your acceptance of this offer and welcoming you aboard.";

      const closingLineLines = pdf.splitTextToSize(closingLineText, pageWidth);
      closingLineLines.forEach((line: string) => {
        // Replace **text** with bold
        const boldText = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
          pdf.setFont("helvetica", "bold");
          return p1;
        });

        // Replace *text* with italic
        const italicText = boldText.replace(/\*(.*?)\*/g, (match, p1) => {
          pdf.setFont("helvetica", "italic");
          return p1;
        });

        // Default normal font text
        pdf.setFont("helvetica", "normal");
        pdf.text(italicText, margin, currentHeight);
        currentHeight += 4; // Smaller gap for lines in a paragraph
      });

      pdf.text("Best wishes,", margin, currentHeight);
      currentHeight += 6;

      pdf.text("Director", margin, currentHeight);
      currentHeight += 6;

      pdf.text(`${company.company_name}`, margin, currentHeight);
      currentHeight += 20;

      // Signature line
      pdf.text(`_________________________`, margin, currentHeight);
      currentHeight += 6;

      // Name (applicant)
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${name}`, margin, currentHeight);

      // Save the document
      pdf.save(
        `${getFullNameOfApplicant(data)}_offer_letter_${Date.now()}.pdf`
      );
    } catch (error) {
      // console.error("Error generating PDF:", error);
      toast({
        title: "Failed to download PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [
    company.company_name,
    company.headquarters,
    company.logo,
    company.website,
    data,
    salary,
    startingDate,
    toast,
  ]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="justify-start gap-1 w-full"
          variant={"ghost"}
          size={"sm"}
        >
          <Icons.edit /> Edit Offer Letter
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle>Offer Letter Viewer</DialogTitle>
          <DialogDescription>
            Edit or preview generated offer letter here.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 h-[60vh]">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 flex-grow">
              <Label>Offered Salary</Label>
              <Input
                disabled={loading}
                placeholder="Offered Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <Label>Date of Joining</Label>
              <Input
                disabled={loading}
                placeholder="Date of Joining"
                type="date"
                value={startingDate}
                onChange={(e) => setStartingDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Preview Offer Letter</Label>
            <Button
              disabled={loading}
              size={"sm"}
              variant={"ghost"}
              className="gap-2"
              onClick={generatePDF}
            >
              <Icons.download /> Download
            </Button>
          </div>

          <div
            ref={contentRef}
            className="size-full rounded-md border p-2 overflow-y-scroll *:text-xs"
          >
            <Markdown
              components={{
                img: ({ node, ...props }) => (
                  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                  <img
                    className="max-w-full h-16 object-contain object-center rounded-md"
                    {...props}
                  />
                ),
              }}
              className={"prose max-w-full"}
            >
              {offerLetter}
            </Markdown>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={loading}
              variant={"destructive"}
              className="rounded-full"
            >
              <Icons.cross /> Close
            </Button>
          </DialogClose>
          <Button
            className={ButtonWarn}
            disabled={loading || SiteConfig.featureFlags.disableExperimentalUI}
          >
            <Icons.update /> Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
