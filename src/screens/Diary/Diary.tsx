import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from "../../components/Header";
import Training from "../../components/Training";

import styles from "./Diary.styles";

import trainings from "../../__mock__/trainings";
import exercises from "../../__mock__/exercises";
import Exercise from "../../components/Exercise";
import ArrowRight from "../../assets/icons/ArrowRight";
import { capitalize } from "../../utils/text";
import programs from "../../__mock__/programs";
import Program from "../../components/Program";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../entry/routes";
import Plus from "../../assets/icons/Plus";
import BottomMenu from "../../components/BottomMenu";

const Diary = () => {
  const navigation = useNavigation();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const navigateTo = (route: string) => () => {
    navigation.navigate(route);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          rightIcon={
            <TouchableOpacity onPress={openMenu}>
              <Plus />
            </TouchableOpacity>
          }>
          Дневник
        </Header>

        <TouchableOpacity
          style={styles.category}
          onPress={navigateTo(ROUTES.MY_TRAINIGS)}>
          <Text style={styles.categoryTitle}>
            {capitalize("Мои тренировки")}
          </Text>
          <ArrowRight color="#fff" />
        </TouchableOpacity>

        <View style={{ marginBottom: 30 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            contentInsetAdjustmentBehavior="never"
            snapToAlignment="center"
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}>
            {trainings.map((training) => (
              <Training key={training.id} training={training} />
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.category}
          onPress={navigateTo(ROUTES.MY_PROGRAMS)}>
          <Text style={styles.categoryTitle}>
            {capitalize("Мои программы")}
          </Text>
          <ArrowRight color="#fff" />
        </TouchableOpacity>

        <View style={{ marginBottom: 30 }}>
          {trainings.slice(0, 0).length ? (
            <ScrollView
              style={{ marginBottom: 30 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              decelerationRate="fast"
              contentInsetAdjustmentBehavior="never"
              snapToAlignment="center"
              automaticallyAdjustContentInsets={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}>
              {programs.map((program) => (
                <Program key={program.id} program={program} />
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                marginHorizontal: 20,
                paddingHorizontal: 20,
                height: 185,
                borderRadius: 6,
                backgroundColor: "#222",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={{ textAlign: "center", color: "#666", fontSize: 15 }}>
                Программы, которые вы сохраните или создадите появятся здесь
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.category}
          onPress={navigateTo(ROUTES.MY_EXERCISES)}>
          <Text style={styles.categoryTitle}>
            {capitalize("Мои упражнения")}
          </Text>
          <ArrowRight color="#fff" />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20 }}>
          {exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </View>
      </ScrollView>

      <BottomMenu
        isVisible={isMenuOpen}
        onClose={closeMenu}
        title="Выберите"
        buttons={[
          { text: "Добавить программу", onPress: () => {} },
          { text: "Добавить тренировку", onPress: () => {} },
        ]}
      />
    </>
  );
};

export default Diary;
