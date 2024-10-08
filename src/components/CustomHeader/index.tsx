import { View, TouchableOpacity, Text, Platform, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {
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
          <Image
            source={require("../../Assets/images/menuIcon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={styles.headertext}>{title}</Text>
        <Image
          source={require("../../Assets/images/editIcon.png")}
          style={{ width: 25, height: 25 }}
        />
      </View>
    </View>
  );
};

export default CustomHeader;
