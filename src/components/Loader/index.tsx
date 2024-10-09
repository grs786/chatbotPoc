import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Colors } from "src/Assets/colors";

const Loader = ({ title }: { title?: string }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.NAVYBLUE} />
      {title && <Text style={styles.headertext}>{title ?? ""}</Text>}
    </View>
  );
};

export default Loader;
