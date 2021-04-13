import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ArrowLeft from "../../assets/icons/ArrowLeft";

import styles from "./ExerciseDetails.styles";
import Heart from "../../assets/icons/Heart";
import HeartFill from "../../assets/icons/HeartFill";

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [isLoading, setLoading] = useState(true);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const addToFavorite = useCallback(() => {}, []);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          top: insets.top,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={navigateBack}>
          <ArrowLeft />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToFavorite} onPress={addToFavorite}>
          {exercise.isFavorite ? <HeartFill /> : <Heart />}
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.videoLoader}>
          <ActivityIndicator size="small" />
        </View>
      )}
      {exercise.video ? (
        <Video
          source={{ uri: exercise.video }}
          style={styles.image}
          resizeMode="cover"
          onLoad={onLoadEnd}
          muted
        />
      ) : (
        <Image
          source={{ uri: exercise.image }}
          style={styles.image}
          onLoadEnd={onLoadEnd}
        />
      )}

      <LinearGradient
        style={styles.gradient}
        colors={["transparent", "#181818"]}>
        <View style={styles.content}>
          <Text style={styles.title}>{exercise.title}</Text>
          <View style={styles.group}>
            <Text style={styles.subtitle}>Уровни сложности</Text>
            <View style={styles.items}>
              {exercise.levels?.map((level) => (
                <View key={level} style={styles.item}>
                  <Text style={styles.itemLabel}>{level}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.subtitle}>Группы мышц</Text>
            <View style={styles.items}>
              {exercise.muscles?.map((muscle) => (
                <View key={muscle} style={styles.item}>
                  <Text style={styles.itemLabel}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ExerciseDetails;
