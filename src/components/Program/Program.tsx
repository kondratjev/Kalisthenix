import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  ImageBackground,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ROUTES from "../../entry/routes";

import styles from "./Program.styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  program: any;
};

const Program = ({ style, program }: Props) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(ROUTES.PROGRAM_DETAILS, { program });
  }, [navigation, program]);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.item, style]}
      onPress={onPress}>
      <ImageBackground
        source={{ uri: program.image }}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.places}>
              <View style={styles.place}>
                <Text style={styles.placeLabel}>8 недель</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              {program.isPro && (
                <View
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    paddingVertical: 3,
                    paddingHorizontal: 7,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "700",
                      fontSize: 12,
                      color: "#fff",
                    }}>
                    Pro
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.title}>{program.title}</Text>
            <Text style={styles.description}>
              {[...program.categories, ...program.styles].join(" • ")}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Program;
