import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { IDutyRoster } from "@/schema/RotaSchema";
import { convertTo12Hour, toYYYYMMDD } from "@/utils/Misc";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: "6pt",
  },
  department: {
    width: "10%",
  },
  name: {
    width: "20%",
  },
  time: {
    width: "7.5%",
  },
  serial: {
    width: "5%",
  },
});

export default function PDFTableRow({ items }: { items: IDutyRoster[] }) {
  const rows = items.map((item, index) => (
    <View style={styles.row} key={`item-${index}`}>
      <Text style={styles.serial}>{index + 1}</Text>

      <Text style={styles.department}>{item.departments.dpt_name}</Text>

      <Text style={styles.name}>
        {item.employees.user.first_name} {item.employees.user.last_name}
      </Text>

      <Text style={styles.name}>{item.shift_db.shift_name}</Text>

      <Text style={styles.time}>
        {convertTo12Hour(item.shift_db.start_time)}
      </Text>

      <Text style={styles.time}>{convertTo12Hour(item.shift_db.end_time)}</Text>

      <Text style={styles.time}>
        {convertTo12Hour(item.shift_db.break_start)}
      </Text>

      <Text style={styles.time}>
        {convertTo12Hour(item.shift_db.break_end)}
      </Text>

      <Text style={styles.time}>
        {new Date(item.from_date).toLocaleDateString("en-GB")}
      </Text>

      <Text style={styles.time}>
        {new Date(item.end_date).toLocaleDateString("en-GB")}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
}
