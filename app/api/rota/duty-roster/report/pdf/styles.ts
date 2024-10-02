import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 16,
    padding: 16,
  },
  headerContainer: {
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(59 130 246)",
    gap: 16,
  },
  headerText: {
    color: "white",
    fontSize: "8pt",
  },
});
