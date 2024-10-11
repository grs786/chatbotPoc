import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import {
  usePostChatData,
  useRetreiveVehicleData,
  useThreadListData,
  useUserSession,
} from "../ChatScreen/useChatOperations";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../Common/screens";
import CustomHeader from "src/components/CustomHeader";
import Apipath from "../../../environment";
import chatHistorys from '../../components/chathistory.json'

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
  const navigation = useNavigation();
  const { createUserSession } = useUserSession();

  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { PostChatData } = usePostChatData();
  const { ThreadListData } = useThreadListData();

  const intialSession = async () => {
    const data = await createUserSession();
    const reqParam = {
      accessToken: data?.access_token,
      vinNumber: Apipath.SAMPLE_VIN,
    };
    const respData = await retreiveVehicleData(reqParam);
    const threadListing = {
      accessToken: data.access_token,
      sessionId: respData?.session_id,
    };
    const historyData = await ThreadListData(threadListing);
    setChatHistory(historyData?.history);

    // Set initial messages
  };

  useEffect(() => {
    intialSession();
  }, []);

  const filteredChats = chatHistorys.history?.filter((chat) =>
    chat?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const isToday = (dateString) => {
    const chatDate = new Date(dateString);
    const today = new Date();
    return (
      chatDate.getDate() === today.getDate() &&
      chatDate.getMonth() === today.getMonth() &&
      chatDate.getFullYear() === today.getFullYear()
    );
  };

  // if the chat is from the previous two days
  const isPreviousTwoDays = (dateString) => {
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


  const renderChatItem = ({ item }) => {
    console.log(JSON.stringify(item, null, 2), "dfsdfsdfsdf");

    return (
      <View style={styles.chatItemContainer}>
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() =>
            navigation.navigate(SCREENS.ChatScreen, { itemID: item.id })
          }
        >
          <MaterialIcons name="chat" size={22} color="gray" />
          <Text numberOfLines={1} style={styles.chatTitle}>
            {item?.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        containerStyle={{
          paddingHorizontal: 0,
          shadowColor: "#fff",
          backgroundColor: "transparent",
          marginBottom: 20,
        }}
        title=""
        {...props}
      />
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



       {/* Today's Chats Section */}
       {todayChats?.length > 0 && (
        <View>
          <Text style={styles.heading}>Today</Text>
          <FlatList
            data={todayChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
          />
        </View>
      )}

      {/* Previous Two Days Chats Section */}
      {previousChats?.length > 0 && (
        <View>
          <Text style={styles.heading}>Last 2 Days</Text>
          <FlatList
            data={previousChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
          />
        </View>
      )}

      {/* Chat List */}
      {/* <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        extraData={chatHistory}
      /> */}
    </View>
  );
};

export default PastConversationsScreen;
