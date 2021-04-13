import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Filter from "../../assets/icons/Filter";

import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";
import Training from "../../components/Training";

import styles from "./MyTrainings.styles";

import trainings from "../../__mock__/trainings";

const MyTrainings = () => {
  return (
    <View style={styles.container}>
      <SmallHeader
        withBackButton
        rightIcon={
          <TouchableOpacity>
            <Filter />
          </TouchableOpacity>
        }>
        Мои тренировки
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={styles.list}>
        {trainings.map((training) => (
          <Training key={training.id} style={styles.item} training={training} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyTrainings;
