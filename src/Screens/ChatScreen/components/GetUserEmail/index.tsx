import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import styles from "./styles";
import styles2 from "../FeedbackModal/styles";
import { validateEmail } from "src/Utilities/utils";
import { Colors } from "src/Assets/colors";

interface IGetUserEmail {
  updateSubmit: (inputValue: string) => void;
  accessToken: string;
}

const GetUserEmail = ({ updateSubmit }: IGetUserEmail) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [EmailValidated, setEmailValidated] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    // Handle the submit action here, e.g., log the input or pass it to a function

    Keyboard.dismiss();
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
              onSubmitEditing={() => Keyboard.dismiss()}
            />
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
