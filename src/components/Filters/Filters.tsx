import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";

import BottomSheetView from "../../components/BottomSheet";

import styles from "./Filters.styles";

type FilterItem = {
  id: string;
  label: string;
};

type FilterGroup = {
  id: string;
  label: string;
  single?: boolean;
  items: FilterItem[];
};

type SelectedFilters = { [key: string]: string[] };

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  filters: FilterGroup[];
  selectedFilters?: SelectedFilters;
  clearFilters: () => void;
  applyFilters: (selectedFilters?: SelectedFilters) => void;
};

const Filters = ({
  bottomSheetRef,
  filters,
  selectedFilters = {},
  clearFilters,
  applyFilters,
}: Props) => {
  const insets = useSafeAreaInsets();
  const height = useBottomTabBarHeight();

  const [selected, setSelected] = useState(selectedFilters);

  const snapPoints = useMemo(
    () => [0, Dimensions.get("window").height - insets.top - height],
    [height, insets.top],
  );

  const onChange = useCallback(
    (index: number) => {
      if (index === 0) {
        setSelected(selectedFilters);
      }
    },
    [selectedFilters],
  );

  const selectFilter = useCallback(
    (filter: FilterGroup, item: FilterItem) => () => {
      const current = selected && selected[filter.id];
      if (current) {
        if (current.includes(item.id)) {
          setSelected({
            ...selected,
            [filter.id]: current.filter((id) => id !== item.id),
          });
        } else {
          setSelected({
            ...selected,
            [filter.id]: [...current, item.id],
          });
        }
      } else {
        setSelected({
          ...selected,
          [filter.id]: [item.id],
        });
      }
    },
    [selected],
  );

  const apply = useCallback(() => {
    applyFilters(selected);
  }, [applyFilters, selected]);

  return (
    <BottomSheetView
      bottomSheetRef={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={onChange}>
      <View
        style={{
          backgroundColor: "#181818",
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#333",
          }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Фильтр
          </Text>
        </View>
        <BottomSheetScrollView style={{ padding: 20 }}>
          {filters.map((filter) => (
            <View key={filter.id} style={{ marginBottom: 15 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 12,
                }}>
                {filter.label}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {filter.items.map((item) => {
                  const isActive = selected[filter.id]?.includes(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        height: 40,
                        backgroundColor: isActive ? "red" : "#333",
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        marginRight: 10,
                        marginBottom: 10,
                      }}
                      onPress={selectFilter(filter, item)}>
                      <Text style={{ color: "#fff" }}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </BottomSheetScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            marginTop: "auto",
          }}>
          <TouchableOpacity
            style={{
              borderColor: "#fff",
              borderWidth: 2,
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 15,
              flex: 1,
            }}
            onPress={clearFilters}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Сбросить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            onPress={apply}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Применить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetView>
  );
};

export default Filters;
