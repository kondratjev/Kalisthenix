import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useCallback, useMemo } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ROUTES from "../../entry/routes";

import styles from "./CompleteTraining.styles";

const CompleteTraining = ({ route }) => {
  const { timer, count, training } = route.params;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const startTraining = useCallback(() => {
    navigation.navigate("CalendarStack", { screen: ROUTES.CALENDAR });
  }, [navigation]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const hours = Math.floor(timer / 3600);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours} : ${getMinutes}`;
  }, [timer]);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: Dimensions.get("window").height / 2,
          justifyContent: "flex-end",
        }}>
        <Image
          source={{ uri: training.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />

        <LinearGradient colors={["transparent", "#181818"]}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 80,
            }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 26,
                marginBottom: 6,
                textAlign: "center",
              }}>
              Тренировка завершена
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 12,
                textAlign: "center",
              }}>
              {training.title}
            </Text>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              {format(new Date(), "dd MMMM yyyy")}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={{}}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: 40,
                marginBottom: 5,
              }}>
              {formattedTime}
            </Text>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
              Длительность
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: 40,
                marginBottom: 5,
              }}>
              {count} / 20
            </Text>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
              Упражнений
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "auto",
          marginBottom: insets.bottom,
          marginHorizontal: 25,
        }}
        onPress={startTraining}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Готово
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteTraining;
