import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import PDFItemsTable from "./PDFItemsTable";
import { IPaginatedDutyRosters } from "@/schema/RotaSchema";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
});

export default function PDFTable({ data }: { data: IPaginatedDutyRosters }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFItemsTable data={data} />
      </Page>
    </Document>
  );
}
