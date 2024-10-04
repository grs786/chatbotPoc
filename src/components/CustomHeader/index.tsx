import { View, TouchableOpacity, Text, Platform } from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const CustomHeader = ({ title }: { title: string; }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons name="list" size={30} color={"black"} />
          <Text style={styles.headertext}>{title}</Text>
          <MaterialIcons name="create" size={30} color={"#1A7BD3"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
