import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import YouTube from "../../assets/icons/YouTube";

import Header from "../../components/Header";
import Item from "./Item";

import ROUTES from "../../entry/routes";

import styles from "./Home.styles";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header
        rightIcon={
          <TouchableOpacity>
            <YouTube />
          </TouchableOpacity>
        }>
        Главная
      </Header>
      <Item
        style={styles.item}
        title="Тренировки"
        description="Более 300 тренировок для всех уровней"
        navigateTo={ROUTES.TRAINIGS}
      />
      <Item
        style={styles.item}
        title="Программы"
        description="Персональные программы для всех"
        navigateTo={ROUTES.PROGRAMS}
      />
      <Item
        style={styles.item}
        title="Упражнения"
        description="Тренируйте определенные мышцы"
        navigateTo={ROUTES.EXERCISES}
      />
    </ScrollView>
  );
};

export default Home;
