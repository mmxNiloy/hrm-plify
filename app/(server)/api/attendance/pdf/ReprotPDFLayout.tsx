import { IPaginatedDutyRosters } from "@/schema/RotaSchema";
import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./styles";
import PDFItemsTable from "./PDFItemsTable";
import {
  IAttendanceRecord,
  IAttendanceReport,
} from "@/schema/AttendanceSchema";

export default function ReportPDFLayout({
  data,
}: {
  data: IAttendanceReport[];
}) {
  return (
    <Document title={`Attendance Report`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Company Image</Text>
          <Text>Company Name</Text>
          <Text>Company Address</Text>
        </View>

        {/* <View style={styles.headerContainer}>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Department</Text>
          <Text style={styles.headerText}>Employee Name</Text>
          <Text style={styles.headerText}>Shift Start</Text>
          <Text style={styles.headerText}>Shift End</Text>
          <Text style={styles.headerText}>Break Time Start</Text>
          <Text style={styles.headerText}>Break Time End</Text>
          <Text style={styles.headerText}>Duty Start Date</Text>
          <Text style={styles.headerText}>Duty End Date</Text>
        </View> */}
        {/* <PDFItemsTable data={data} /> */}
      </Page>
    </Document>
  );
}
