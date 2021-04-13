import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    marginRight: 10,
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "700" },
  rightIcon: {
    marginLeft: "auto",
  },
});

export default styles;
