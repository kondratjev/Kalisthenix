import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Filter from "../../assets/icons/Filter";

import Exercise from "../../components/Exercise";
import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";

import styles from "./MyExercises.styles";

import exercises from "../../__mock__/exercises";

const MyExercises = () => {
  return (
    <View style={styles.container}>
      <SmallHeader
        withBackButton
        rightIcon={
          <TouchableOpacity>
            <Filter />
          </TouchableOpacity>
        }>
        Мои упражнения
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyExercises;
