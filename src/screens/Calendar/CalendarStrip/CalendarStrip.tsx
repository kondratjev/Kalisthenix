import React, { useMemo, useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addDays,
  eachDayOfInterval,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./CalendarStrip.style";

type Props = {
  start: Date;
  end: Date;
  selectedDate?: Date;
  activeDates?: Date[];
  onSelectDate: (date: Date) => void;
};

const CalendarStrip = (props: Props) => {
  const { start, end, selectedDate, activeDates, onSelectDate } = props;

  const stripRef = useRef<FlatList>(null);

  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const shortWeekDays = useMemo(() => {
    const firstDOW = startOfWeek(new Date());
    return Array(7)
      .fill(null)
      .map((_, i) => format(addDays(firstDOW, i), "EEEEEE", { locale: ru }));
  }, []);

  const weeks = useMemo(() => {
    let startDate = startOfWeek(start, { locale: ru });
    const endDate = startOfWeek(end, { locale: ru });
    const days = [];
    while (startDate <= endDate) {
      days.push(
        eachDayOfInterval({
          start: startDate,
          end: addDays(startDate, 6),
        }),
      );
      startDate = addDays(startDate, 7);
    }
    return days;
  }, [end, start]);

  const initialScrollIndex = useMemo(() => {
    if (selectedDate) {
      return weeks.findIndex((item) => {
        return item.some((subitem) => isSameDay(subitem, selectedDate));
      });
    } else {
      return 0;
    }
  }, [selectedDate, weeks]);

  const onPress = useCallback(
    (date: Date) => () => {
      onSelectDate(date);
    },
    [onSelectDate],
  );

  const renderItem = useCallback(
    ({ item }: { item: Date[] }) => {
      return (
        <View style={styles.item}>
          {item.map((date) => {
            const isSelected = !!selectedDate && isSameDay(date, selectedDate);
            const isActive = activeDates?.some((item) => isSameDay(date, item));
            const dayStyle = isSelected
              ? [styles.day, styles.daySelected]
              : styles.day;
            const dayShortNameStyle = isActive
              ? [styles.dayShortName, styles.dayShortNameActive]
              : styles.dayShortName;
            const dayNumberStyle = isActive
              ? [styles.dayNumber, styles.dayNumberActive]
              : styles.dayNumber;
            return (
              <TouchableOpacity
                style={dayStyle}
                key={date.toISOString()}
                onPress={onPress(date)}>
                <Text style={dayShortNameStyle}>
                  {shortWeekDays[date.getDay()]}
                </Text>
                <Text style={dayNumberStyle}>{date.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [activeDates, onPress, selectedDate, shortWeekDays],
  );

  const WIDTH = Dimensions.get("window").width;

  const getItemLayout = useCallback(
    (_, index: number) => ({
      length: WIDTH,
      offset: WIDTH * index,
      index,
    }),
    [WIDTH],
  );

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const mode = (dates: Date[]) => {
      return dates
        .sort(
          (a, b) =>
            dates.filter((date) => date === a).length -
            dates.filter((date) => date === b).length,
        )
        .pop();
    };

    const months = viewableItems[0].item.map((item) => item.getMonth());
    const monthNumber = mode(months);
    const newDate = new Date();
    newDate.setMonth(monthNumber);
    setCurrentMonth(newDate);
  }, []);

  return (
    <View>
      <Text style={styles.month}>
        {currentMonth && format(currentMonth, "LLLL", { locale: ru })}
      </Text>
      <FlatList
        ref={stripRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialScrollIndex}
        decelerationRate="fast"
        data={weeks}
        extraData={selectedDate}
        keyExtractor={(_, index) => `${index}`}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </View>
  );
};

export default CalendarStrip;
