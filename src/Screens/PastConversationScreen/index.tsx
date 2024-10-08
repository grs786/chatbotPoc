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
export interface IChatHistory {
  id: string;
  createdAt: string;
  name: string;
  userId: string;
  userIdentifier: string;
}

const PastConversationsScreen = (
  props: React.JSX.IntrinsicAttributes & {
    title: string;
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
  const filteredChats = chatHistory?.filter((chat) =>
    chat?.name.toLowerCase().includes(searchText.toLowerCase())
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

      {/* Chat List */}
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        extraData={chatHistory}
        // ListHeaderComponent={() => (
        //   <>
        //     <Text style={styles.dateHeading}>Today</Text>
        //     {chatHistory?.filter((chat) => chat?.createdAt === "Today")
        //       .length === 0 && (
        //       <Text style={styles.emptyMessage}>No chats today</Text>
        //     )}
        //   </>
        // )}
        // ListFooterComponent={() => (
        //   <>
        //     <Text style={styles.dateHeading}>Previous 2 Days</Text>
        //     {chatHistory?.filter(
        //       (chat) => chat?.createdAt === "Previous 7 days"
        //     ).length === 0 && (
        //       <Text style={styles.emptyMessage}>No previous chats</Text>
        //     )}
        //   </>
        // )}
      />
    </View>
  );
};

export default PastConversationsScreen;
