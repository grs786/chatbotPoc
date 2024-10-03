import { View, TouchableOpacity, Text, Platform } from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const CustomHeader = ({ title, image }: { title: string; image: string }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name={image} size={30} color={"white"} />
          <Text style={styles.headertext}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
