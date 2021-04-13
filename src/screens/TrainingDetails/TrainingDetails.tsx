import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ArrowLeft from "../../assets/icons/ArrowLeft";

import Exercise from "../../components/Exercise";
import GroupTitle from "../../components/GroupTitle";

import ROUTES from "../../entry/routes";

import styles from "./TrainingDetails.styles";
import Heart from "../../assets/icons/Heart";
import HeartFill from "../../assets/icons/HeartFill";

const TrainingsRoute = ({ groups }: { groups: any[] }) => (
  <View style={{ padding: 20 }}>
    {groups.map((group) => (
      <View key={group.name} style={{ marginBottom: 5 }}>
        <GroupTitle>{group.name}</GroupTitle>
        {group.items.map((item) => (
          <Exercise key={item.id} exercise={item} />
        ))}
      </View>
    ))}
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

const routes = [
  { key: LEVELS.BEGINNER, title: "Начинающий" },
  { key: LEVELS.INTERMEDIATE, title: "Опытный" },
  { key: LEVELS.ADVANCED, title: "Продвинутый" },
];

const AllTrainings = ({ route }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [level, setLevel] = useState(LEVELS.BEGINNER);

  const training = route.params.training;

  const renderScene = ({ route }) => {
    const groups = training.exercises.find((item) => item.level === route.key)
      .groups;
    return <TrainingsRoute groups={groups} />;
  };

  const onIndexChange = useCallback((selectedIndex: number) => {
    switch (selectedIndex) {
      case 0:
        setLevel(LEVELS.BEGINNER);
        break;
      case 1:
        setLevel(LEVELS.INTERMEDIATE);
        break;
      case 2:
        setLevel(LEVELS.ADVANCED);
        break;
    }
    setIndex(selectedIndex);
  }, []);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const startTraining = useCallback(() => {
    navigation.navigate(ROUTES.ACTIVE_TRAINING, { training, level });
  }, [level, navigation, training]);

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
          {training.isFavorite ? <HeartFill /> : <Heart />}
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
            source={{ uri: training.image }}
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
                  {training.places.map((muscle) => (
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
                  {training.title}
                </Text>
                <Text
                  style={{
                    color: "lightgray",
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: "600",
                  }}>
                  {[
                    ...training.categories,
                    ...training.styles,
                    ...training.muscles,
                  ].join(" • ")}
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
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={{ backgroundColor: "transparent" }}
                indicatorStyle={{ backgroundColor: "red" }}
                labelStyle={{ textTransform: "capitalize" }}
                activeColor="#fff"
                inactiveColor="#808080"
                pressColor="#fff"
              />
            )}
          />
        </Animated.View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: insets.bottom,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={startTraining}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Начать тренировку
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllTrainings;
