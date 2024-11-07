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
import { setItem } from "src/Utilities/StorageClasses";
import { validateEmail } from "src/Utilities/utils";
import { Colors } from "src/Assets/colors";
import ApiPaths from "../../../../../environment";

interface IGetUserEmail {
  updateSubmit: (inputValue: string) => void;
  accessToken: string;
}

const GetUserEmail = ({ updateSubmit, accessToken }: IGetUserEmail) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [EmailValidated, setEmailValidated] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { validateUserMail } = useValidateUserMail();

  const handleSubmit = async () => {
    // Handle the submit action here, e.g., log the input or pass it to a function
    // setModalVisible(false);
    const userData = await validateUserMail(inputValue, accessToken);
    await setItem(ApiPaths.USER_IDENTIFIER ?? "", inputValue);
    updateSubmit(inputValue);
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
            <Text style={styles.modalTitle}>Enter your ford email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email..."
              value={inputValue}
              onChangeText={(text) => {
                const isValid = validateEmail(text);
                isValid ? setEmailValidated(true) : setEmailValidated(false);
                setInputValue(text);
              }}
            />
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
            <TouchableOpacity
              disabled={!EmailValidated}
              style={[
                styles2.button,
                {
                  backgroundColor: !EmailValidated
                    ? Colors.DISABLED_BUTTON
                    : Colors.NAVYBLUE,
                },
              ]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles2.buttonText,
                  {
                    color: !EmailValidated
                      ? Colors.DISABLED_TEXT
                      : Colors.WHITE,
                  },
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default GetUserEmail;
