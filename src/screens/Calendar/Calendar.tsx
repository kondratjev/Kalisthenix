import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { subMonths, addMonths, format, subDays, addDays } from "date-fns";
import { ru } from "date-fns/locale";

import Header from "../../components/Header";
import CalendarStrip from "./CalendarStrip";
import Training from "../../components/Training";

import styles from "./Calendar.styles";

import trainings from "../../__mock__/trainings";

const todayTrainings = {
  [format(subDays(new Date(), 2), "yyyy-MM-dd")]: trainings,
  [format(new Date(), "yyyy-MM-dd")]: trainings,
  [format(addDays(new Date(), 2), "yyyy-MM-dd")]: trainings,
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const selectedTrainings = useMemo(() => {
    const date = format(selectedDate, "yyyy-MM-dd");
    return todayTrainings.hasOwnProperty(date) ? todayTrainings[date] : [];
  }, [selectedDate]);

  return (
    <ScrollView style={styles.container}>
      <Header>Календарь</Header>
      <CalendarStrip
        start={subMonths(new Date(), 1)}
        end={addMonths(new Date(), 1)}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        activeDates={[
          subDays(new Date(), 2),
          new Date(),
          addDays(new Date(), 2),
        ]}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 18,
            textTransform: "capitalize",
          }}>
          {format(selectedDate, "EEEE", { locale: ru })}
        </Text>
      </View>

      {selectedTrainings.length ? (
        selectedTrainings.map((training) => (
          <Training key={training.id} style={styles.item} training={training} />
        ))
      ) : (
        <View
          style={{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            height: 185,
            borderRadius: 6,
            backgroundColor: "#222",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ textAlign: "center", color: "#666", fontSize: 15 }}>
            Программы, которые вы выполните появятся здесь
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Calendar;
