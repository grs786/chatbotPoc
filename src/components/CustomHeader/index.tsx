import { View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";

const CustomHeader = ({
  title,
  navigation,
  containerStyle,
  beginNewChat,
  navigateToHome,
  isChatIconDisable,
  iconName,
  rightIcon,
}: {
  title: string;
  navigation: any;
  containerStyle?: any;
  beginNewChat?: () => void;
  navigateToHome?: () => void;
  isChatIconDisable?: boolean;
  iconName?: string;
  rightIcon?: string;
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={iconName ?? require("../../Assets/images/menuIcon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.headertext}>{title ?? ""}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={beginNewChat} disabled={isChatIconDisable}>
          <Image
            source={rightIcon ?? require("../../Assets/images/editIcon.png")}
            style={{
              width: 25,
              height: 25,
              tintColor: isChatIconDisable ? "grey" : undefined,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
