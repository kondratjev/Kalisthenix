import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get("window").width - 30,
    flexDirection: "row",
    marginHorizontal: 15,
  },
  day: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 2,
  },
  daySelected: {
    borderColor: "red",
  },
  dayShortName: {
    marginBottom: 10,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#666",
    fontSize: 16,
  },
  dayShortNameActive: {
    color: "#fff",
  },
  dayNumber: {
    textAlign: "center",
    fontWeight: "500",
    color: "#666",
    fontSize: 16,
  },
  dayNumberActive: {
    color: "#ccc",
  },
  month: {
    paddingHorizontal: 20,
    color: "#fff",
    marginBottom: 15,
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "600",
  },
});

export default styles;
