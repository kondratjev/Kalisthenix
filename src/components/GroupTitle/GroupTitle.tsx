import React from "react";
import { Text } from "react-native";

import styles from "./GroupTitle.styles";

type Props = { children: string };

const GroupTitle = ({ children }: Props) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default GroupTitle;
