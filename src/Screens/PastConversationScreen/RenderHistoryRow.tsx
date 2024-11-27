import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { IChatHistory } from "./types";

interface IChatHistoryProps {
  entry: IChatHistory;
  handleRowClick: (entry: IChatHistory) => void;
}
const RenderHistoryRow: React.FC<IChatHistoryProps> = ({
  entry,
  handleRowClick,
}) => {
  return (
    <TouchableOpacity
      style={styles.rowMainContainer}
      key={entry.id}
      onPress={() => handleRowClick(entry)}
    >
      <Text numberOfLines={1} style={styles.entryText}>
        {entry.name}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../Assets/images/historyIcon.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text numberOfLines={1} style={styles.chatTitle}>
          {moment(entry?.createdAt).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderHistoryRow;
