import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useFetchAllThreadData } from "../../Hooks/useChatOperations";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../Common/screens";
import CustomHeader from "src/components/CustomHeader";
import Apipath from "../../../environment";
import { getItem } from "src/Utilities/StorageClasses";
import Loader from "src/components/Loader";

export interface IChatHistory {
  id: string;
  createdAt: string;
  name: string;
  userId: string;
  userIdentifier: string;
}

const PastConversationsScreen = (
  props: React.JSX.IntrinsicAttributes & {
    title?: string;
    navigation: any;
    containerStyle?: StyleSheet | undefined;
  }
) => {
  const [searchText, setSearchText] = useState("");
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { fetchAllThreadData } = useFetchAllThreadData();

  const initialSession = async () => {
    const accessTokenId = await getItem(Apipath.ACCESS_TOKEN);
    const user_Id = await getItem(Apipath.USER_ID);

    if (user_Id && accessTokenId) {
      setIsLoading(true);
      const historyData = await fetchAllThreadData(user_Id, accessTokenId);
      setChatHistory(historyData?.history);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialSession();
  }, []);

  const filteredChats = chatHistory?.filter((chat) =>
    chat?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const isToday = (dateString: string) => {
    const chatDate = new Date(dateString);
    const today = new Date();
    return (
      chatDate.getDate() === today.getDate() &&
      chatDate.getMonth() === today.getMonth() &&
      chatDate.getFullYear() === today.getFullYear()
    );
  };

  // if the chat is from the previous two days
  const isPreviousTwoDays = (dateString: string) => {
    const chatDate = new Date(dateString);
    const today = new Date();
    const diffInTime = today.getTime() - chatDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 2 && diffInDays > 0;
  };

  // Filter today's chats
  const todayChats = filteredChats?.filter((chat) => isToday(chat.createdAt));

  // Filter chats from the previous two days
  const previousChats = filteredChats?.filter((chat) =>
    isPreviousTwoDays(chat.createdAt)
  );

  const renderChatItem = (item: IChatHistory) => {
    return (
      <View style={styles.chatItemContainer}>
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() =>
            navigation.navigate(SCREENS.ChatScreen, { itemData: item })
          }
        >
          <MaterialIcons name="chat" size={22} color="gray" />
          <Text numberOfLines={1} style={styles.chatTitle}>
            {item?.name}
          </Text>
        </TouchableOpacity>
        {/* Commented as of now because its not in scope in this sprint */}
        {/* <TouchableOpacity>
          <MaterialIcons name="delete" size={20} color="gray" />
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader containerStyle={styles.headerstyle} title="" {...props} />
      <Text style={styles.heading}>Past Chats</Text>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today's Chats Section */}
        {todayChats && todayChats?.length > 0 && (
          <View>
            <Text style={styles.heading}>Today</Text>
            {todayChats?.map((item) => renderChatItem(item))}
          </View>
        )}

        {/* Previous Two Days Chats Section */}
        {previousChats && previousChats?.length > 0 && (
          <View>
            <Text style={styles.heading}>Last 2 Days</Text>
            {previousChats?.map((item) => renderChatItem(item))}
          </View>
        )}
        {todayChats?.length === 0 && previousChats?.length === 0 && (
          <Text style={styles.noHistoryText}>No history available</Text>
        )}
        {isLoading && <Loader />}
      </ScrollView>
    </View>
  );
};

export default PastConversationsScreen;
