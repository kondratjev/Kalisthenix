import React, { useCallback, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Filter from "../../assets/icons/Filter";

import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";
import Program from "../../components/Program";

import styles from "./Programs.styles";

import programs from "../../__mock__/programs";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Filters from "../../components/Filters";

const FILTERS = [
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
];

const Programs = () => {
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
        Программы
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={styles.list}>
        {programs.map((program) => (
          <Program key={program.id} style={styles.item} program={program} />
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

export default Programs;
