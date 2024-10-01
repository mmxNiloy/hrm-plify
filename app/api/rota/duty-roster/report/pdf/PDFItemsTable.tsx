import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PDFTableRow from "./PDFTableRow";
import { IPaginatedDutyRosters } from "@/schema/RotaSchema";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 16,
    padding: 8,
  },
});

export default function PDFItemsTable({
  data,
}: {
  data: IPaginatedDutyRosters;
}) {
  return (
    <View style={styles.tableContainer}>
      {/*<TableHeader />*/}
      <PDFTableRow items={data.data} />
      {/*<TableFooter items={data.items} />*/}
    </View>
  );
}
