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

const pastChatsData = [
  {
    id: "1",
    title: "2021 F-150, 3.5L cyclon...",
    date: "Today",
  },
  {
    id: "2",
    title: "Select_new",
    date: "Today",
  },
  {
    id: "3",
    title: "Engine making noise",
    date: "Previous 7 days",
  },
];

export interface IChatHistory {
  id: string;
  createdAt: string;
  name: string;
  userId: string;
  userIdentifier: string;
}

const PastConversationsScreen = (props) => {
  const [searchText, setSearchText] = useState("");
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>();
  const [sessionId, setSessionId] = useState("hello test data");
  // const [accessToken, setAccessToken] = useState<string>("");
  const navigation = useNavigation();
  const { createUserSession } = useUserSession();

  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { PostChatData } = usePostChatData();
  const { ThreadListData } = useThreadListData();

  const intialSession = async () => {
    setSessionId("hello test data12");
    const data = await createUserSession();
    const reqParam = {
      accessToken: data?.access_token,
      vinNumber: "1FTFW1E85MFA63398",
    };
    const respData = await retreiveVehicleData(reqParam);

    const threadListing = {
      accessToken: data.access_token,
      sessionId: respData?.session_id,
    };
    console.log(threadListing, "threadListing->ahjdgfhjsdf");
    const historyData = await ThreadListData(threadListing);
    console.log(
      JSON.stringify(historyData?.history, null, 2),
      "`setChatHistorysetChatHistory0978`"
    );
    setChatHistory(historyData?.history);
    setSessionId("hello test data13");

    // Set initial messages
  };

  useEffect(() => {
    intialSession();
  }, []);
  // const filteredChats = chatHistory?.filter((chat) =>
  //   chat?.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  console.log(sessionId, "sessionId_09866");
  console.log(chatHistory, "chatHistorychatHistorychatHistorychatHistory");

  const renderChatItem = ({ item }) => (
    <View style={styles.chatItemContainer}>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate(SCREENS.ChatScreen, { itemID: item.id })
        }
      >
        <MaterialIcons name="chat" size={22} color="gray" />
        <Text style={styles.chatTitle}>{item?.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="delete" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
        <MaterialIcons name="edit" size={24} color="gray" />
      </View>

      {/* Chat List */}
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        extraData={chatHistory}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.dateHeading}>Today</Text>
            {chatHistory?.filter((chat) => chat?.createdAt === "Today")
              .length === 0 && (
              <Text style={styles.emptyMessage}>No chats today</Text>
            )}
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={styles.dateHeading}>Yesterday</Text>
            {chatHistory?.filter(
              (chat) => chat?.createdAt === "Previous 7 days"
            ).length === 0 && (
              <Text style={styles.emptyMessage}>No previous chats</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default PastConversationsScreen;
