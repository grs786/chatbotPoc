import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  StyleProp,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const CustomHeader = ({
  title,
  navigation,
  containerStyle,
}: {
  title: string;
  navigation: any;
  containerStyle?: undefined;
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
        <Text style={styles.headertext}>{title ?? ""}</Text>
        <Image
          source={require("../../Assets/images/editIcon.png")}
          style={{ width: 25, height: 25 }}
        />
      </View>
    </View>
  );
};

export default CustomHeader;
