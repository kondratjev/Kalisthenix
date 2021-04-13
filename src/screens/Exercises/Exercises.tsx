import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Filter from "../../assets/icons/Filter";

import Exercise from "../../components/Exercise";
import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";
import Filters from "../../components/Filters";

import styles from "./Exercises.styles";

import exercises from "../../__mock__/exercises";

const FILTERS = [
  {
    id: "level",
    label: "Уровень подготовки",
    items: [
      { id: "beginner", label: "Новичок" },
      { id: "intermediate", label: "Опытный" },
      { id: "advanced", label: "Продвинутый" },
    ],
  },
  {
    id: "muscles",
    label: "Мышечная группа",
    items: [
      { id: "back", label: "Спина" },
      { id: "shoulders", label: "Плечи" },
      { id: "biceps", label: "Бицепс" },
      { id: "triceps", label: "Трицепс" },
      { id: "chest", label: "Грудь" },
      { id: "abs", label: "Пресс" },
      { id: "legs", label: "Ноги" },
    ],
  },
];

const Exercises = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const [selectedFilters, setSelectedFilters] = useState<any>({
    level: ["beginner"],
    muscles: ["back", "biceps"],
  });

  const openFilters = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeFilters = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
    closeFilters();
  }, [closeFilters]);

  const applyFilters = useCallback(
    (filters) => {
      setSelectedFilters(filters);
      closeFilters();
    },
    [closeFilters],
  );

  return (
    <View style={styles.container}>
      <SmallHeader
        withBackButton
        rightIcon={
          <TouchableOpacity onPress={openFilters}>
            <Filter />
          </TouchableOpacity>
        }>
        Упражнения
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </ScrollView>
      <Filters
        bottomSheetRef={bottomSheetRef}
        filters={FILTERS}
        selectedFilters={selectedFilters}
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </View>
  );
};

export default Exercises;
