import { View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";

const CustomHeader = ({
  title,
  navigation,
  containerStyle,
  beginNewChat,
}: {
  title: string;
  navigation: any;
  containerStyle?: undefined;
  beginNewChat: () => void;
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require("../../Assets/images/menuIcon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text onPress={beginNewChat} style={styles.headertext}>
          {title ?? ""}
        </Text>
        <TouchableOpacity onPress={beginNewChat}>
          <Image
            source={require("../../Assets/images/editIcon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
