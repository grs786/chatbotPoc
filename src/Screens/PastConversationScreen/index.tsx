import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useFetchAllThreadData } from "src/Hooks/useChatOperations";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomHeader from "src/components/CustomHeader";
import { getItem } from "src/Utilities/StorageClasses";
import { ApplicationStackParamList } from "src/types/navigation";
import { SCREENS } from "src/Common/screens";
import { useDrawerStatus } from "@react-navigation/drawer";
import ApiPaths from "../../../endpoints";
import RenderHistoryRow from "./RenderHistoryRow";

export interface IChatHistory {
  id: string;
  createdAt: string;
  name: string;
  userId: string;
  userIdentifier: string;
  vin?: string;
}

interface IHistoryEntry {
  id: string;
  createdAt: string;
  name: string;
  userId: string;
  userIdentifier: string;
}

interface IHistoryComponentProps {
  groupedHistory: IHistoryEntry[];
}

const PastConversationsScreen = (
  props: React.JSX.IntrinsicAttributes & {
    title?: string;
    navigation: any;
    containerStyle?: StyleSheet | undefined;
  }
) => {
  const [searchText, setSearchText] = useState("");
  const [userUUID, setUserUUID] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const isDrawerOpen = useDrawerStatus() === "open";
  const [expandedVin, setExpandedVin] = useState<{ [vin: string]: boolean }>(
    {}
  );

  const { fetchAllThreadData } = useFetchAllThreadData();

  const initialSession = async () => {
    const accessTokenId = await getItem(ApiPaths.ACCESS_TOKEN ?? "");
    const user_Id = await getItem(ApiPaths.USER_ID ?? "");

    if (user_Id && accessTokenId) {
      setIsLoading(true);
      const historyData = await fetchAllThreadData(
        `${user_Id}`,
        `${accessTokenId}`
      );
      setChatHistory(historyData?.history);
      setIsLoading(false);
    }
    const userUUID = (await getItem(ApiPaths.USER_IDENTIFIER ?? "")) ?? "";
    setUserUUID(userUUID);
  };

  useEffect(() => {
    initialSession();
  }, [isDrawerOpen]);

  // if the chat is from the previous two days
  const isPreviousTwoDays = (dateString: string) => {
    const chatDate = new Date(dateString);
    const today = new Date();
    const diffInTime = today.getTime() - chatDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 2;
  };

  // // Filter 2 days chats
  const filteredChats = chatHistory?.filter((chat) =>
    isPreviousTwoDays(chat.createdAt)
  );

  // Step 1: Process data to group entries by VIN number
  const groupedByVin = filteredChats.reduce(
    (
      acc: {
        withVin: { [vin: string]: IChatHistory[] };
        others: IChatHistory[];
      },
      entry
    ) => {
      if (entry && entry.name) {
        const parts = entry.name.split(" : ");
        if (parts.length > 1) {
          const [name, vinNumber] = parts;
          const entryData: IChatHistory = {
            name,
            createdAt: entry.createdAt,
            id: entry.id,
            userId: entry.userId,
            userIdentifier: entry.userIdentifier,
          };
          acc.withVin[vinNumber] = acc.withVin[vinNumber] || [];
          acc.withVin[vinNumber].push(entryData);
        } else {
          acc.others.push({
            name: entry.name,
            createdAt: entry.createdAt,
            id: entry.id,
            userId: entry.userId,
            userIdentifier: entry.userIdentifier,
          });
        }
      }
      return acc;
    },
    { withVin: {}, others: [] }
  );

  const vinGroups = Object.keys(groupedByVin.withVin).map((vin) => ({
    vin,
    entries: groupedByVin.withVin[vin],
  }));

  const toggleExpand = (vin: string) => {
    setExpandedVin((prev) => ({ [vin]: !prev[vin] }));
  };

  const handleRowClick = (entry: IChatHistory) => {
    navigation.navigate(`${SCREENS.ChatScreen}`, { itemData: entry });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.uuidText}>{userUUID}</Text> */}
      {/* <Text style={styles.heading}>Past Chats</Text> */}

      {/* Search Bar */}
      <View style={styles.searchMainContainer}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log(
              JSON.stringify(navigation, null, 2),
              "navigationnavigation"
            );
            navigation.navigate(`${SCREENS.ChatScreen}`);
            // navigation?.toggleDrawer()
          }}
        >
          <Image
            source={require("../../Assets/images/menuOpen.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.newConversationView}>
        <Image
          style={styles.arrowBtnView}
          source={require("../../Assets/images/plusBtn.png")}
        />
        <Text style={styles.newConversation}>New Conversation</Text>
      </TouchableOpacity>
      <View style={styles.seperator} />
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              initialSession();
            }}
          />
        }
      >
        {vinGroups.length === 0 && groupedByVin.others.length === 0 ? (
          <Text style={styles.noHistoryText}>No history available</Text>
        ) : (
          <>
            {vinGroups.map((group) => (
              <View key={group.vin} style={styles.vinGroup}>
                <TouchableOpacity
                  style={styles.vinHeader}
                  onPress={() => toggleExpand(group.vin)}
                >
                  <Text style={styles.vinTitle}>VIN - {group.vin}</Text>
                  <Image
                    style={[
                      styles.arrowBtnView,
                      {
                        transform: [
                          {
                            rotateX: expandedVin[group.vin] ? "180deg" : "0deg",
                          },
                        ],
                      },
                    ]}
                    source={require("../../Assets/images/arrowBtn.png")}
                  />
                </TouchableOpacity>
                {expandedVin[group.vin] &&
                  group.entries.map((entry, idx) => (
                    <RenderHistoryRow
                      entry={entry}
                      handleRowClick={(entry) => handleRowClick(entry)}
                    />
                  ))}
              </View>
            ))}
            {groupedByVin.others.length > 0 && (
              <View style={styles.vinGroup}>
                <TouchableOpacity
                  style={styles.vinHeader}
                  onPress={() => toggleExpand("Others")}
                >
                  <Text style={styles.vinTitle}>Others</Text>
                  <Image
                    style={[
                      styles.arrowBtnView,
                      {
                        transform: [
                          {
                            rotateX: expandedVin["Others"] ? "180deg" : "0deg",
                          },
                        ],
                      },
                    ]}
                    source={require("../../Assets/images/arrowBtn.png")}
                  />
                </TouchableOpacity>
                {expandedVin["Others"] &&
                  groupedByVin.others.map((entry) => (
                    <RenderHistoryRow
                      entry={entry}
                      handleRowClick={(entry) => handleRowClick(entry)}
                    />
                  ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PastConversationsScreen;
