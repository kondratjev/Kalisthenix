import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import Filter from "../../assets/icons/Filter";

import SearchInput from "../../components/SearchInput";
import SmallHeader from "../../components/SmallHeader";
import Program from "../../components/Program";

import styles from "./MyPrograms.styles";

import programs from "../../__mock__/programs";

const MyPrograms = () => {
  return (
    <View style={styles.container}>
      <SmallHeader
        withBackButton
        rightIcon={
          <TouchableOpacity>
            <Filter />
          </TouchableOpacity>
        }>
        Мои программы
      </SmallHeader>
      <View style={styles.search}>
        <SearchInput value="" onChange={() => {}} />
      </View>
      <ScrollView style={styles.list}>
        {programs.map((program) => (
          <Program key={program.id} style={styles.item} program={program} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyPrograms;
