import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const CustomHeader = ({ title, image }: { title: string; image: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingTop: Platform.isIOS ? 55 : 30,
        width: "100%",
        backgroundColor: "#061db7",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
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
