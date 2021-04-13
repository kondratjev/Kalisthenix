import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const App = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(0);

  const [sex, setSex] = useState<string>("man");
  const [age, setAge] = useState<number>(23);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(83);
  const [activity, setActivity] = useState<number>(1.2);
  const [total, setTotal] = useState<number>(0);

  const [zel, setZel] = useState<string>("loose");
  const [percent, setPercent] = useState<number>(0.1);

  const calculate = () => {
    if (sex === "man") {
      const ttl = (10 * weight + 6.25 * height - 5 * age + 5) * activity;
      setTotal(ttl);
    } else if (sex === "woman") {
      const ttl = (10 * weight + 6.25 * height - 5 * age - 161) * activity;
      setTotal(ttl);
    }
  };

  const secondTotal = () => {
    if (zel === "loose") {
      return total * (1 - percent);
    } else if (zel === "gain") {
      return total * (1 + percent);
    }
    return total;
  };

  const protein = 1.75 * weight;
  const proteinCal = protein * 4;

  const fat = 0.9 * weight;
  const fatCal = fat * 9;

  const carbsCal = secondTotal() - proteinCal - fatCal;
  const carbs = carbsCal / 4;

  const goToNextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get("window").width * step,
      animated: true,
    });
  }, [step]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            width: Dimensions.get("window").width,
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
              marginTop: 30,
            }}>
            Выберите пол
          </Text>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}>
            <Picker.Item label="Мужчина" value="man" />
            <Picker.Item label="Женщина" value="woman" />
          </Picker>
          <TouchableOpacity onPress={goToNextStep}>
            <Text>Далее</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: Dimensions.get("window").width }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
              marginTop: 30,
            }}>
            Укажите рост
          </Text>
          <Picker
            selectedValue={height}
            onValueChange={(itemValue) => setHeight(itemValue)}>
            {new Array(100)
              .fill(null)
              .map((item, index) => index)
              .map((item) => {
                return (
                  <Picker.Item key={item} label={`${item} см`} value={item} />
                );
              })}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text>Возраст</Text>
          <TextInput
            onChangeText={(text) =>
              setAge(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${age}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>Рост</Text>
          <TextInput
            onChangeText={(text) =>
              setHeight(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${height}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>Вес</Text>
          <TextInput
            onChangeText={(text) =>
              setWeight(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${weight}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>Уровень активности</Text>
          <Picker
            selectedValue={activity}
            onValueChange={(itemValue) => setActivity(itemValue)}>
            <Picker.Item label="Минимальная активность" value={1.2} />
            <Picker.Item label="Слабая активность" value={1.375} />
            <Picker.Item label="Средняя активность" value={1.55} />
            <Picker.Item label="Высокая активность" value={1.725} />
            <Picker.Item label="Экстра-активность" value={1.9} />
          </Picker>
        </View>
        <View>
          <TouchableOpacity onPress={calculate}>
            <Text>Посчитать</Text>
          </TouchableOpacity>
        </View>
        {total ? (
          <>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Ваш рацион {total.toFixed(0)} ккал
            </Text>
            <View>
              <Text>Цель</Text>
              <Picker
                selectedValue={zel}
                onValueChange={(itemValue) => setZel(itemValue)}>
                <Picker.Item label="Похудение" value="loose" />
                <Picker.Item label="Поддерживать вес" value="stay" />
                <Picker.Item label="Набирать вес" value="gain" />
              </Picker>
            </View>
            {zel === "loose" || zel === "gain" ? (
              <View>
                <Text>На сколько?</Text>
                <Picker
                  selectedValue={percent}
                  onValueChange={(itemValue) => setPercent(itemValue)}>
                  <Picker.Item label="10%" value={0.15} />
                  <Picker.Item label="15%" value={0.2} />
                  <Picker.Item label="20%" value={0.25} />
                </Picker>
              </View>
            ) : null}
            {secondTotal() ? (
              <>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Ваш рацион {secondTotal().toFixed(0)} ккал
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Белки: {protein.toFixed(1)} гр / {proteinCal.toFixed(1)} ккал
                  ({((proteinCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Жиры: {fat.toFixed(1)} гр / {fatCal.toFixed(1)} ккал (
                  {((fatCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Углеводы: {carbs.toFixed(1)} гр / {carbsCal.toFixed(1)} ккал (
                  {((carbsCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
              </>
            ) : null}
          </>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
