import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ArrowLeft from "../../assets/icons/ArrowLeft";
import Heart from "../../assets/icons/Heart";
import HeartFill from "../../assets/icons/HeartFill";

import GroupTitle from "../../components/GroupTitle";

import ROUTES from "../../entry/routes";

import styles from "./ProgramDetails.styles";

const ProgramDetails = ({ route }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const program = route.params.program;

  const openDetails = useCallback(
    (training: any) => () => {
      navigation.navigate(ROUTES.TRAINING_DETAILS, { training });
    },
    [navigation],
  );

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const addToFavorite = useCallback(() => {}, []);

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
          {program.isFavorite ? <HeartFill /> : <Heart />}
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: pan.y } } }],
          {
            useNativeDriver: false,
          },
        )}>
        <View
          style={{
            height: 350,
            justifyContent: "flex-end",
          }}>
          <Animated.Image
            source={{ uri: program.image }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              transform: [
                {
                  translateY: pan.y.interpolate({
                    inputRange: [-1000, 0],
                    outputRange: [-100, 0],
                    extrapolate: "clamp",
                  }),
                },
                {
                  scale: pan.y.interpolate({
                    inputRange: [-3000, 0],
                    outputRange: [20, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />

          <Animated.View
            style={{
              transform: [
                {
                  translateY: pan.y.interpolate({
                    inputRange: [-1000, 0],
                    outputRange: [52 * 20, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}>
            <LinearGradient colors={["transparent", "#181818"]}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 60,
                  paddingBottom: 20,
                }}>
                <View style={styles.places}>
                  {[...program.places, ...program.muscles].map((muscle) => (
                    <View key={muscle} style={styles.place}>
                      <Text style={styles.placeLabel}>{muscle}</Text>
                    </View>
                  ))}
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "700",
                    marginBottom: 10,
                  }}>
                  {program.title}
                </Text>
                <Text
                  style={{
                    color: "lightgray",
                    textTransform: "uppercase",
                    fontSize: 14,
                    fontWeight: "600",
                  }}>
                  {[...program.categories, ...program.styles].join(" • ")}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-1000, 0],
                  outputRange: [52 * 20, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}>
          <View style={{ padding: 20 }}>
            {program.groups.map((group) => (
              <View key={group.title} style={{ marginBottom: 5 }}>
                <GroupTitle>{group.title}</GroupTitle>
                {group.trainings.map((training) => (
                  <TouchableOpacity
                    style={{
                      marginBottom: 15,
                      borderRadius: 6,
                      backgroundColor: "#555",
                    }}
                    onPress={openDetails(training)}>
                    <View
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: 15,
                      }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          fontSize: 18,
                          marginBottom: 8,
                        }}>
                        {training.title}
                      </Text>
                      <Text
                        style={{
                          color: "lightgray",
                          textTransform: "uppercase",
                          fontSize: 12,
                          fontWeight: "600",
                        }}>
                        {[...training.categories, ...training.styles].join(
                          " • ",
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default ProgramDetails;
