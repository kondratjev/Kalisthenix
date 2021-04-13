import React, { useCallback, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Filter from "../../assets/icons/Filter";

import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";
import Training from "../../components/Training";

import styles from "./Trainings.styles";

import trainings from "../../__mock__/trainings";
import Filters from "../../components/Filters";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const FILTERS = [
  {
    id: "type",
    label: "Тип",
    single: true,
    items: [
      { id: "free", label: "Обычные" },
      { id: "pro", label: "Pro" },
    ],
  },
  {
    id: "place",
    label: "Место",
    items: [
      { id: "home", label: "Дом" },
      { id: "gym", label: "Зал" },
      { id: "street", label: "Улица" },
    ],
  },
  {
    id: "category",
    label: "Категория",
    items: [
      { id: "calisthenics", label: "Калистеника" },
      { id: "weightedCalisthenics", label: "Калистеника с весом" },
      { id: "weighted", label: "С весом" },
    ],
  },
  {
    id: "style",
    label: "Стиль",
    items: [
      { id: "fatBurning", label: "Жиросжигание" },
      { id: "reps", label: "Выносливость" },
      { id: "strength", label: "Сила" },
      { id: "tabata", label: "Табата" },
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

const Trainings = () => {
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
        Тренировки
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={styles.list}>
        {trainings.map((training) => (
          <Training key={training.id} style={styles.item} training={training} />
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

export default Trainings;
