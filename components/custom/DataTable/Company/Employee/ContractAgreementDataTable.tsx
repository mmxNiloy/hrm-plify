import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { CompanyContractAgreementDataTableColumns } from "../../Columns/Company/CompanyContractAgreementDataTableColumns";
import { IContractAgreement } from "@/schema/EmployeeSchema";

const exampleContractAgreements: IContractAgreement[] = [
  {
    employment_type: "Full-time",
    employee_id: "EMP987654",
    employee_name: "Jane Smith",
    dob: new Date("1990-05-20"),
    mobile: "+1-234-567-8901",
    nationality: "Canadian",
    ni_number: "AB123456C",
    visa_expired: new Date("2025-08-31"),
    passport_number: "P987654321",
    address: "456 Elm Street, Apt 3B, Cityville, CV 12345",
    agreement_word_document_url:
      "https://example.com/agreements/contract_jane.docx",
    agreement_pdf_document_url:
      "https://example.com/agreements/contract_jane.pdf",
  },
  {
    employment_type: "Part-time",
    employee_id: "EMP123456",
    employee_name: "John Doe",
    dob: new Date("1985-12-15"),
    mobile: "+44-7890-123456",
    nationality: "British",
    ni_number: "CD789012E",
    visa_expired: new Date("2024-12-15"),
    passport_number: "P123456789",
    address: "789 Oak Avenue, Apt 2A, Londontown, LT 56789",
    // No document URLs provided
  },
  {
    employment_type: "Contractor",
    employee_id: "EMP456789",
    employee_name: "Emily Johnson",
    dob: new Date("1992-03-10"),
    mobile: "+61-412-345-678",
    nationality: "Australian",
    ni_number: "EF345678G",
    visa_expired: new Date("2026-07-22"),
    passport_number: "P456789123",
    address: "321 Pine Street, Unit 10, Sydney, SY 23456",
    agreement_word_document_url:
      "https://example.com/agreements/contract_emily.docx",
    // Only Word document URL provided
  },
  {
    employment_type: "Full-time",
    employee_id: "EMP678901",
    employee_name: "Michael Brown",
    dob: new Date("1988-07-02"),
    mobile: "+1-555-678-9012",
    nationality: "American",
    ni_number: "GH567890I",
    visa_expired: new Date("2025-09-12"),
    passport_number: "P678901234",
    address: "123 Maple Drive, Apt 4C, Suburbia, SB 89012",
    agreement_pdf_document_url:
      "https://example.com/agreements/contract_michael.pdf",
    // Only PDF document URL provided
  },
  {
    employment_type: "Temporary",
    employee_id: "EMP234567",
    employee_name: "Sarah Lee",
    dob: new Date("1995-11-25"),
    mobile: "+91-98765-43210",
    nationality: "Indian",
    ni_number: "IJ234567K",
    visa_expired: new Date("2023-11-25"),
    passport_number: "P234567890",
    address: "987 Birch Road, Apt 5D, Metropolis, MP 34567",
    agreement_word_document_url:
      "https://example.com/agreements/contract_sarah.docx",
    agreement_pdf_document_url:
      "https://example.com/agreements/contract_sarah.pdf",
  },
];

export default function ContractAgreementDataTable() {
  return (
    <DataTable
      data={exampleContractAgreements}
      columns={CompanyContractAgreementDataTableColumns}
    />
  );
}
