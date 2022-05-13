import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "../../assets/icons/ArrowLeft";

import styles from "./SmallHeader.styles";

type Props = { children: string; withBackButton?: boolean; rightIcon?: any };

const SmallHeader = ({ children, withBackButton, rightIcon }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const style = {
    paddingTop: insets.top,
  };

  return (
    <View style={style}>
      <StatusBar barStyle="dark-content" backgroundColor="#222" />
      <View style={styles.header}>
        {withBackButton && (
          <TouchableOpacity onPress={navigateBack}>
            <View style={styles.backButton}>
              <ArrowLeft />
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{children}</Text>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

export default SmallHeader;
