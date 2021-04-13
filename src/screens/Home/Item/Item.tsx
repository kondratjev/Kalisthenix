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

import styles from "./Item.styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  navigateTo: string;
};

const Item = ({ style, title, description, navigateTo = "" }: Props) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(navigateTo);
  }, [navigateTo, navigation]);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.item, style]}
      onPress={onPress}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/500/200" }}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Item;
