import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "../../assets/icons/ArrowLeft";

import styles from "./Header.styles";

type Props = { children: string; withBackButton?: boolean; rightIcon?: any };

const Header = ({ children, withBackButton, rightIcon }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const style = {
    paddingTop: insets.top,
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      <View style={[styles.header, style]}>
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
    </>
  );
};

export default Header;
