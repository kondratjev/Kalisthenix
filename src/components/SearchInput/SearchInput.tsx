import React from "react";
import { TextInput, View } from "react-native";

import styles from "./SearchInput.styles";

type Props = { value: string; onChange: (text: string) => void };

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Поиск"
        placeholderTextColor="#333"
        clearButtonMode="always"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchInput;
