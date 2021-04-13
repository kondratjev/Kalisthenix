import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    marginHorizontal: 20,
  },
  background: {
    width: Dimensions.get("window").width - 40,
    height: 185,
  },
  backgroundImage: {
    borderRadius: 5,
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "100%",
    justifyContent: "flex-end",
    padding: 15,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    color: "#fff",
    fontSize: 16,
  },
});

export default styles;
