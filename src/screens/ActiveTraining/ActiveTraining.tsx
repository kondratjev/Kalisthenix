import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Video from "react-native-video";
import Close from "../../assets/icons/Close";

import styles from "./ActiveTraining.styles";
import ArrowRight from "../../assets/icons/ArrowRight";
import BottomSheetView from "../../components/BottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import GroupTitle from "../../components/GroupTitle";
import Exercise from "../../components/Exercise";
import ArrowDown from "../../assets/icons/ArrowDown";
import ROUTES from "../../entry/routes";
import HeartFill from "../../assets/icons/HeartFill";
import Heart from "../../assets/icons/Heart";
import Finish from "../../assets/icons/Finish";

const ActiveTraining = ({ route }) => {
  const { training, level } = route.params;

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const timerIncrementRef = useRef<any>(null);
  const countdownIncrementRef = useRef<any>(null);
  const config = useRef({
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  });

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(-1);
  const [groupIndex, setGroupIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVideoPaused, setVideoPaused] = useState(false);
  const [count, setCount] = useState(0);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleStart = useCallback(() => {
    timerIncrementRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    clearInterval(timerIncrementRef.current);
  }, []);

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  const closeModal = useCallback(() => {
    handleStart();
    setVideoPaused(false);
    setModalVisible(false);
  }, [handleStart]);

  const showModal = useCallback(() => {
    handlePause();
    setVideoPaused(true);
    setModalVisible(true);
  }, [handlePause]);

  const navigateBack = useCallback(() => {
    closeModal();
    navigation.goBack();
  }, [closeModal, navigation]);

  const groups = useMemo(() => {
    return training.exercises.find((item) => item.level === level).groups;
  }, [level, training.exercises]);

  const currentGroup = useMemo(() => {
    return groups[groupIndex];
  }, [groupIndex, groups]);

  const currentGroupItemsLength = useMemo(() => {
    return currentGroup.items.length - 1;
  }, [currentGroup.items.length]);

  const nextGroup = useMemo(() => {
    return groups[groupIndex + 1];
  }, [groupIndex, groups]);

  const currentExercise = useMemo(() => {
    return currentGroup.items[exerciseIndex];
  }, [exerciseIndex, currentGroup]);

  const nextExercise = useMemo(() => {
    if (exerciseIndex < currentGroupItemsLength) {
      return currentGroup.items[exerciseIndex + 1];
    } else {
      return nextGroup?.items[0];
    }
  }, [
    exerciseIndex,
    currentGroupItemsLength,
    currentGroup.items,
    nextGroup?.items,
  ]);

  const completeTraining = useCallback(() => {
    closeModal();
    navigation.navigate(ROUTES.COMPLETE_TRAINING, {
      timer,
      count,
      training,
    });
  }, [closeModal, navigation, timer, count, training]);

  const goToNextExercise = useCallback(() => {
    if (exerciseIndex < currentGroupItemsLength) {
      setExerciseIndex(exerciseIndex + 1);
      setLoading(true);
      setCount(count + 1);
    } else if (groupIndex < groups.length - 1) {
      setGroupIndex(groupIndex + 1);
      setExerciseIndex(0);
      setLoading(true);
      setCount(count + 1);
    } else {
      completeTraining();
    }
  }, [
    exerciseIndex,
    currentGroupItemsLength,
    groupIndex,
    groups.length,
    count,
    completeTraining,
  ]);

  const goToPreviosExercise = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
      setLoading(true);
    } else if (groupIndex > 0) {
      setGroupIndex(groupIndex - 1);
      setExerciseIndex(currentGroupItemsLength);
      setLoading(true);
    }
  }, [currentGroupItemsLength, exerciseIndex, groupIndex]);

  useEffect(() => {
    if (currentExercise.time) {
      setCountdown(currentExercise.time);
    } else {
      setCountdown(-1);
      clearInterval(countdownIncrementRef.current);
      countdownIncrementRef.current = null;
    }
  }, [currentExercise]);

  useEffect(() => {
    if (countdown === 0) {
      goToNextExercise();
      setCountdown(-1);
      clearInterval(countdownIncrementRef.current);
      countdownIncrementRef.current = null;
    }
  }, [countdown, goToNextExercise]);

  const snapPoints = useMemo(
    () => [0, Dimensions.get("window").height - insets.top],
    [insets.top],
  );

  const openDetails = useCallback(() => {
    bottomSheetRef.current?.expand();
    setVideoPaused(true);
  }, []);

  const closeDetails = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const startExercise = useCallback(() => {
    countdownIncrementRef.current = setInterval(() => {
      setCountdown((timer) => timer - 1);
    }, 1000);
  }, []);

  const addToFavorite = useCallback(() => {}, []);

  const formattedTime = useMemo(() => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const hours = Math.floor(timer / 3600);
    const getHours = `0${hours}`.slice(-2);

    return hours
      ? `${getHours} : ${getMinutes} : ${getSeconds}`
      : `${getMinutes} : ${getSeconds}`;
  }, [timer]);

  const selectExercise = useCallback(
    (selectedGroupIndex, selectedExerciseIndex) => () => {
      setGroupIndex(selectedGroupIndex);
      setExerciseIndex(selectedExerciseIndex);
      closeDetails();
    },
    [closeDetails],
  );

  const onBottomSheetChange = useCallback((index: number) => {
    if (index === 0) {
      setVideoPaused(false);
    }
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
          alignItems: "center",
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
          onPress={showModal}>
          <Close />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 26 }}>
            {formattedTime}
          </Text>
        </View>

        <TouchableOpacity style={styles.addToFavorite} onPress={addToFavorite}>
          {currentExercise.isFavorite ? <HeartFill /> : <Heart />}
        </TouchableOpacity>
      </View>

      <GestureRecognizer
        onSwipeLeft={goToNextExercise}
        onSwipeRight={goToPreviosExercise}
        onSwipeUp={openDetails}
        config={config.current}>
        {isLoading && (
          <View style={styles.videoLoader}>
            <ActivityIndicator size="small" />
          </View>
        )}
        {currentExercise.video ? (
          <Video
            source={{ uri: currentExercise.video }}
            style={styles.image}
            resizeMode="cover"
            onLoad={onLoadEnd}
            paused={isVideoPaused}
            muted
          />
        ) : (
          <Image
            source={{ uri: currentExercise.image }}
            style={styles.image}
            onLoadEnd={onLoadEnd}
          />
        )}

        {countdown !== -1 && !countdownIncrementRef.current && !isLoading && (
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={startExercise}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 26,
                  textAlign: "center",
                  fontWeight: "700",
                }}>
                Нажмите, что бы начать упражнение
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <LinearGradient
          colors={["transparent", "#181818"]}
          style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <View style={[styles.content, { paddingBottom: insets.bottom }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 10,
              }}>
              <TouchableOpacity onPress={openDetails} style={{ flex: 1 }}>
                <View>
                  <Text style={styles.title}>{currentExercise.title}</Text>
                  <Text style={styles.reps}>
                    {currentExercise.repeats
                      ? `X${currentExercise.repeats}`
                      : `${countdown} сек`}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={goToNextExercise}>
                {nextExercise ? (
                  <>
                    <Image
                      source={{ uri: nextExercise.image }}
                      style={{ height: 50, width: 50, borderRadius: 5 }}
                    />
                    <Text
                      style={{
                        marginHorizontal: 15,
                        color: "#fff",
                        fontWeight: "500",
                        flexShrink: 1,
                      }}
                      numberOfLines={3}>
                      {nextExercise.title}
                    </Text>
                    <View style={{ marginLeft: "auto" }}>
                      <ArrowRight />
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 5,
                        backgroundColor: "#181818",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <Finish />
                    </View>
                    <Text
                      style={{
                        marginHorizontal: 15,
                        color: "#fff",
                        fontWeight: "500",
                        flexShrink: 1,
                      }}
                      numberOfLines={3}>
                      Закончить
                    </Text>
                    <View style={{ marginLeft: "auto" }}>
                      <ArrowRight />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: -3,
                marginBottom: 10,
              }}>
              {new Array(currentGroup.items.length)
                .fill(null)
                .map((_, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width:
                          Dimensions.get("window").width /
                            currentGroup.items.length -
                          20,
                        height: 4,
                        backgroundColor:
                          exerciseIndex < index
                            ? "rgba(255,255,255,0.15)"
                            : "#fff",
                        marginHorizontal: 3,
                        borderRadius: 2,
                      }}
                    />
                  );
                })}
            </View>
            <TouchableOpacity
              onPress={openDetails}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={styles.groupName}>{currentGroup.name}</Text>
              <ArrowDown />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </GestureRecognizer>

      <BottomSheetView
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={onBottomSheetChange}>
        <View
          style={{
            backgroundColor: "#181818",
            flex: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <View style={{ padding: 20 }}>
            {groups.map((group, groupIndex) => (
              <View
                key={`${group.name}-${groupIndex}`}
                style={{ marginBottom: 5 }}>
                <GroupTitle>{group.name}</GroupTitle>
                {group.items.map((exercise, exerciseIndex) => (
                  <Exercise
                    key={exercise.id}
                    exercise={exercise}
                    onPress={selectExercise(groupIndex, exerciseIndex)}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </BottomSheetView>

      <Modal
        style={{}}
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        backdropOpacity={0.5}
        avoidKeyboard
        propagateSwipe
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View
          style={{
            backgroundColor: "#181818",
            borderRadius: 10,
            padding: 25,
          }}>
          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              onPress={closeModal}>
              <Close />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 50 }}>
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
                {count} / {20}
              </Text>
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
                Упражнений
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}>
            <TouchableOpacity
              style={{
                borderColor: "#fff",
                borderWidth: 2,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
                flex: 1,
              }}
              onPress={navigateBack}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Покинуть
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
              onPress={completeTraining}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Завершить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActiveTraining;
