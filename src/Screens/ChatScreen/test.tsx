import React, { useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "../../components/CustomHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { styles } from "./styles";
import VehicleInfoModal from "./components/VechileInfoModal";
import { useNavigation } from "@react-navigation/native";
import {
  useUserSession,
  useRetreiveVehicleData,
  usePostChatData,
} from "./useChatOperations";
import { IVehicleInfo } from "./types";
import Apipath from "../../../environment";
import RenderVehicleInfo from "./components/RenderVehicleInfo";
import Loader from "src/components/Loader";

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title="WSM Assistant" navigation={navigation} />

      {!isLoading && vehicleInfo && (
        <RenderVehicleInfo
          vehicleInfo={vehicleInfo}
          onPress={() => {
            setVehicleInfo(null);
            setModalVisible(true);
          }}
        />
      )}
      {isLoading && <Loader />}
      <MessageList
        messages={messages}
        handleReaction={handleReaction}
        messageReactions={messageReactions}
      />

      <StepHistory />

      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingHorizontal: 10, marginVertical: 10 }}
      >
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
          pickImage={pickImage}
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </KeyboardAvoidingView>
      {modalVisible && (
        <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;
