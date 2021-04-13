import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowRight from "../../assets/icons/ArrowRight";
import Check from "../../assets/icons/Check";

import SmallHeader from "../../components/SmallHeader";

import styles from "./EditProfile.styles";

const TouchRow = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
      <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const EditRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
}) => {
  const textInputRef = useRef<TextInput>(null);

  const onPress = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
      <TextInput
        ref={textInputRef}
        style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
        value={value}
        onChangeText={onChange}
      />
    </TouchableOpacity>
  );
};

const ActionRow = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
      <ArrowRight />
    </TouchableOpacity>
  );
};

const EditProfile = () => {
  return (
    <>
      <SmallHeader
        withBackButton
        rightIcon={
          <TouchableOpacity>
            <Check />
          </TouchableOpacity>
        }>
        Настройки
      </SmallHeader>
      <ScrollView style={styles.container}>
        <View style={{ paddingVertical: 10 }}>
          <EditRow label="Никнейм" value="kondratjev" onChange={() => {}} />
          <EditRow
            label="Почта"
            value="kondratjev@gmail.com"
            onChange={() => {}}
          />
          <EditRow label="Имя" value="Максим" onChange={() => {}} />
          <EditRow label="Город" value="Самара" onChange={() => {}} />
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
              Фитнес
            </Text>
          </View>
          <TouchRow label="Пол" value="Мужской" onPress={() => {}} />
          <TouchRow label="Возраст" value="23" onPress={() => {}} />
          <TouchRow label="Вес" value="80.2 кг" onPress={() => {}} />
          <TouchRow label="Рост" value="175 см" onPress={() => {}} />
          <TouchRow label="Уровень" value="Начинающий" onPress={() => {}} />
          <TouchRow label="Цель" value="Похудеть" onPress={() => {}} />
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
              Аккаунт
            </Text>
          </View>
          <ActionRow label="Поменять пароль" onPress={() => {}} />
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
            }}
            style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
            <Text style={{ color: "red", fontWeight: "500", fontSize: 16 }}>
              Выход
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;
