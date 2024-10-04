import { View, TouchableOpacity, Text, Platform } from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title,navigation }: { title: string,navigation:any }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="list" size={30} color={"black"} />
        </TouchableOpacity>

        <Text style={styles.headertext}>{title}</Text>
        <MaterialIcons name="create" size={30} color={"#1A7BD3"} />
      </View>
    </View>
  );
};

export default CustomHeader;
