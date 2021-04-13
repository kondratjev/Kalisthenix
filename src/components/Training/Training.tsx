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

import styles from "./Training.styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  training: any;
};

const Training = ({ style, training }: Props) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(ROUTES.TRAINING_DETAILS, { training });
  }, [navigation, training]);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.item, style]}
      onPress={onPress}>
      <ImageBackground
        source={{ uri: training.image }}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.places}>
              {training.places.map((place) => (
                <View key={place} style={styles.place}>
                  <Text style={styles.placeLabel}>{place}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "row" }}>
              {training.isPro && (
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
            <Text style={styles.title}>{training.title}</Text>
            <Text style={styles.description}>
              {[
                ...training.categories,
                ...training.styles,
                ...training.muscles,
              ].join(" • ")}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Training;
