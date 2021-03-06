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
            ???????????????? ??????
          </Text>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}>
            <Picker.Item label="??????????????" value="man" />
            <Picker.Item label="??????????????" value="woman" />
          </Picker>
          <TouchableOpacity onPress={goToNextStep}>
            <Text>??????????</Text>
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
            ?????????????? ????????
          </Text>
          <Picker
            selectedValue={height}
            onValueChange={(itemValue) => setHeight(itemValue)}>
            {new Array(100)
              .fill(null)
              .map((item, index) => index)
              .map((item) => {
                return (
                  <Picker.Item key={item} label={`${item} ????`} value={item} />
                );
              })}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <ScrollView>
        <View>
          <Text>??????????????</Text>
          <TextInput
            onChangeText={(text) =>
              setAge(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${age}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>????????</Text>
          <TextInput
            onChangeText={(text) =>
              setHeight(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${height}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>??????</Text>
          <TextInput
            onChangeText={(text) =>
              setWeight(parseFloat(text.replace(/[^0-9]/g, "")))
            }
            value={`${weight}`}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>?????????????? ????????????????????</Text>
          <Picker
            selectedValue={activity}
            onValueChange={(itemValue) => setActivity(itemValue)}>
            <Picker.Item label="?????????????????????? ????????????????????" value={1.2} />
            <Picker.Item label="???????????? ????????????????????" value={1.375} />
            <Picker.Item label="?????????????? ????????????????????" value={1.55} />
            <Picker.Item label="?????????????? ????????????????????" value={1.725} />
            <Picker.Item label="????????????-????????????????????" value={1.9} />
          </Picker>
        </View>
        <View>
          <TouchableOpacity onPress={calculate}>
            <Text>??????????????????</Text>
          </TouchableOpacity>
        </View>
        {total ? (
          <>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              ?????? ???????????? {total.toFixed(0)} ????????
            </Text>
            <View>
              <Text>????????</Text>
              <Picker
                selectedValue={zel}
                onValueChange={(itemValue) => setZel(itemValue)}>
                <Picker.Item label="??????????????????" value="loose" />
                <Picker.Item label="???????????????????????? ??????" value="stay" />
                <Picker.Item label="???????????????? ??????" value="gain" />
              </Picker>
            </View>
            {zel === "loose" || zel === "gain" ? (
              <View>
                <Text>???? ???????????????</Text>
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
                  ?????? ???????????? {secondTotal().toFixed(0)} ????????
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  ??????????: {protein.toFixed(1)} ???? / {proteinCal.toFixed(1)} ????????
                  ({((proteinCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  ????????: {fat.toFixed(1)} ???? / {fatCal.toFixed(1)} ???????? (
                  {((fatCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  ????????????????: {carbs.toFixed(1)} ???? / {carbsCal.toFixed(1)} ???????? (
                  {((carbsCal / secondTotal()) * 100).toFixed(1)}%)
                </Text>
              </>
            ) : null}
          </>
        ) : null}
    </ScrollView>
  );
};

export default App;
