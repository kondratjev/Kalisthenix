import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import Settings from "../../assets/icons/Settings";

import Header from "../../components/Header";
import Training from "../../components/Training";

import ROUTES from "../../entry/routes";
import trainings from "../../__mock__/trainings";

import styles from "./Profile.styles";

const Profile = () => {
  const navigation = useNavigation();

  const editProfile = useCallback(() => {
    navigation.navigate(ROUTES.EDIT_PROFILE);
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Header
        rightIcon={
          <TouchableOpacity onPress={editProfile}>
            <Settings />
          </TouchableOpacity>
        }>
        kondratjev
      </Header>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              backgroundColor: "lightgray",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 30, fontWeight: "600" }}>MA</Text>
          </View>
          <View style={{ marginLeft: 15, alignItems: "flex-start" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 5,
              }}>
              Max
            </Text>
            <View style={styles.place}>
              <Text style={styles.placeLabel}>Начинающий</Text>
            </View>
            <Text style={{ color: "#fff" }}>Самара, Россия</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          fontSize: 18,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}>
        23 января 2021
      </Text>
      {trainings.slice(0, 1).map((training) => (
        <Training key={training.id} style={styles.item} training={training} />
      ))}
    </ScrollView>
  );
};

export default Profile;
