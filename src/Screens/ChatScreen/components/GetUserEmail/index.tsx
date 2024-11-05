import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import styles2 from "../FeedbackModal/styles";
import { useValidateUserMail } from "src/Hooks/useChatOperations";

interface IGetUserEmail {
  updateSubmit: () => void;
  accessToken: string;
}

const GetUserEmail = ({ updateSubmit, accessToken }: IGetUserEmail) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { validateUserMail } = useValidateUserMail();

  const handleSubmit = async () => {
    // Handle the submit action here, e.g., log the input or pass it to a function
    console.log("Submitted value:", inputValue);
    // setModalVisible(false);
    // updateSubmit();
    const userData = await validateUserMail(inputValue, accessToken);
    console.log(userData, "userdatasdnfggbsdmgbmdnsfgbm");
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter your email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email..."
              value={inputValue}
              onChangeText={setInputValue}
            />
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
            <TouchableOpacity style={styles2.button} onPress={handleSubmit}>
              <Text style={styles2.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default GetUserEmail;
