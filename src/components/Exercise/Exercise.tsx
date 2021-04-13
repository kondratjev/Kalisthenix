import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  Image,
  StyleProp,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import ROUTES from "../../entry/routes";

import styles from "./Exercise.styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  exercise: any;
  onPress?: () => void;
};

const Exercise = ({ style, exercise, onPress }: Props) => {
  const navigation = useNavigation();

  const openDetails = useCallback(() => {
    navigation.navigate(ROUTES.EXERCISE_DETAILS, { exercise });
  }, [exercise, navigation]);

  return (
    <View style={[styles.item, style]}>
      <TouchableOpacity style={styles.wrapper} onPress={onPress || openDetails}>
        <Image source={{ uri: exercise.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {exercise.title}
          </Text>
          <Text style={styles.type} numberOfLines={1}>
            {exercise.repeats
              ? `X${exercise.repeats}`
              : `${exercise.time} сек` || exercise.muscles.join(" • ")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Exercise;
