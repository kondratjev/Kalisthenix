import React, { useCallback, useState } from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

import styles from "./Auth.styles";
import ArrowLeft from "../../assets/icons/ArrowLeft";

const STEPS = {
  SEX: 0,
  GOAL: 1,
  LEVEL: 2,
  WEIGHT: 3,
  HEIGHT: 4,
  AGE: 5,
};

const TITLES = [
  "Ваш пол",
  "Ваша цель",
  "Ваш уровень",
  "Ваш вес",
  "Ваш рост",
  "Ваш возраст",
];

const MAX_STEPS = Object.keys(STEPS).length;

function generateArrayOfNumbers(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

const Auth = () => {
  const [step, setStep] = useState(0);

  const goBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 30,
        }}>
        {new Array(MAX_STEPS).fill(null).map((_, index) => {
          return (
            <View
              key={index}
              style={{
                width: Dimensions.get("window").width / MAX_STEPS - 15,
                height: 2,
                backgroundColor: step < index ? "#333" : "#fff",
                marginHorizontal: 5,
              }}
            />
          );
        })}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}>
        {step > 0 && (
          <TouchableOpacity onPress={goBack}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "700",
            flex: 1,
          }}>
          {TITLES[step]}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}>
        {step === STEPS.SEX && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <TouchableOpacity
              style={{
                height: 125,
                width: 125,
                backgroundColor: "#333",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
              onPress={() => setStep(STEPS.GOAL)}>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>👨</Text>
              <Text style={{ color: "#fff" }}>Мужчина</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 125,
                width: 125,
                backgroundColor: "#333",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
              onPress={() => setStep(STEPS.GOAL)}>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>👩</Text>
              <Text style={{ color: "#FFF" }}>Женщина</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === STEPS.GOAL && (
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.LEVEL)}>
              <Text style={{ color: "#fff" }}>Похудеть</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.LEVEL)}>
              <Text style={{ color: "#fff" }}>Поддерживать вес</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.LEVEL)}>
              <Text style={{ color: "#fff" }}>Набрать мышечную массу</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 2 && (
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.WEIGHT)}>
              <Text style={{ color: "#fff" }}>Начинающий</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.WEIGHT)}>
              <Text style={{ color: "#fff" }}>Опытный</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={() => setStep(STEPS.WEIGHT)}>
              <Text style={{ color: "#fff" }}>Продвинутый</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <View>
            <Picker
              itemStyle={{ color: "#fff", fontSize: 26, fontWeight: "700" }}
              selectedValue={70}
              onValueChange={(itemValue, itemIndex) => {}}>
              {generateArrayOfNumbers(20, 160).map((item) => (
                <Picker.Item key={item} label={`${item} кг`} value={item} />
              ))}
            </Picker>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setStep(STEPS.HEIGHT)}>
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 4 && (
          <View>
            <Picker
              itemStyle={{ color: "#fff", fontSize: 26, fontWeight: "700" }}
              selectedValue={170}
              onValueChange={(itemValue, itemIndex) => {}}>
              {generateArrayOfNumbers(70, 250).map((item) => (
                <Picker.Item key={item} label={`${item} см`} value={item} />
              ))}
            </Picker>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setStep(STEPS.AGE)}>
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 5 && (
          <View>
            <Picker
              itemStyle={{ color: "#fff", fontSize: 26, fontWeight: "700" }}
              selectedValue={20}
              onValueChange={(itemValue, itemIndex) => {}}>
              {generateArrayOfNumbers(4, 110).map((item) => (
                <Picker.Item key={item} label={`${item} лет`} value={item} />
              ))}
            </Picker>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={async () => {
                  await AsyncStorage.setItem("IS_SIGNED_IN", "true");
                }}>
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Auth;
