import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

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

const PastConversationsScreen = ({props}:any) => {
  const [searchText, setSearchText] = useState("");

  const filteredChats = pastChatsData.filter((chat) =>
    chat.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <View style={styles.chatItemContainer}>
      <TouchableOpacity style={styles.chatItem}>
        <MaterialIcons name="chat" size={22} color="gray" />
        <Text style={styles.chatTitle}>{item.title}</Text>
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
        <MaterialIcons name='edit' size={24} color="gray" />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.dateHeading}>Today</Text>
            {filteredChats.filter((chat) => chat.date === "Today").length ===
              0 && <Text style={styles.emptyMessage}>No chats today</Text>}
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={styles.dateHeading}>Previous 7 days</Text>
            {filteredChats.filter((chat) => chat.date === "Previous 7 days")
              .length === 0 && (
              <Text style={styles.emptyMessage}>No previous chats</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default PastConversationsScreen;
