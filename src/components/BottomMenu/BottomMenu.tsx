import React from "react";
import { Text, TouchableOpacity } from "react-native";
import BottomModal from "../BottomModal";

import styles from "./BottomMenu.styles";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  buttons: { onPress: () => void; text: string }[];
};

const BottomMenu = ({ isVisible, onClose, title, buttons }: Props) => {
  return (
    <BottomModal isVisible={isVisible} onClose={onClose}>
      <>
        <Text style={styles.title}>{title}</Text>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.text}
            style={styles.button}
            onPress={button.onPress}>
            <Text style={styles.buttonLabel}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </>
    </BottomModal>
  );
};

export default BottomMenu;
