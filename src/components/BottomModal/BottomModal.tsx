import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./BottomModal.styles";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
};

const BottomModal = ({ children, isVisible, onClose }: Props) => {
  const insets = useSafeAreaInsets();

  const wrapperStyles = {
    marginTop: insets.top,
    paddingBottom: insets.bottom,
  };

  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      swipeDirection="down"
      avoidKeyboard
      propagateSwipe>
      <View style={[styles.wrapper, wrapperStyles]}>{children}</View>
    </Modal>
  );
};

export default BottomModal;
