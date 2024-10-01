// Chat.js
import React, { useState, useEffect } from 'react';
import {
    GiftedChat,
    InputToolbar,
    Composer,
    Send
} from 'react-native-gifted-chat';
import { View, Button, Modal, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [recording, setRecording] = useState(null);
    const [audioUri, setAudioUri] = useState('');

    useEffect(() => {
        // Load initial messages if any
        setMessages([
            {
                _id: 1,
                text: 'Hello!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
            {
                _id: 2,
                text: 'How can I help you?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'User',
                },
            },
        ]);

        // Set the audio mode for recording
        const setAudioMode = async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                staysActiveInBackground: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                playThroughEarpieceAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            });
        };

        setAudioMode();

        // Cleanup function
        return () => {
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, []);

    const onSend = (newMessages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const message = {
                _id: Math.random().toString(),
                text: '',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'User',
                },
                image: result.assets[0].uri,
            };
            onSend([message]);
        }

        setModalVisible(false); // Close modal after selection
    };

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording); // Store the recording reference
            setAudioUri(recording.getURI());
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        if (recording) {
            setRecording(null);
            await recording.stopAndUnloadAsync();
            const message = {
                _id: Math.random().toString(),
                text: '',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'User',
                },
                audio: audioUri,
            };
            onSend([message]);
        }
        setModalVisible(false); // Close modal after recording
    };

    const renderInputToolbar = (props) => (
        <InputToolbar {...props}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingRight:10  }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="attach-file" size={24} color="black" />
                </TouchableOpacity>
                <Composer {...props} />
                {/* <Send {...props} /> */}
                <MaterialIcons name="send" size={24} color="black" />

            </View>
        </InputToolbar>
    );

    const renderAttachmentModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Option</Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            pickImage();
                        }}
                    >
                        <Text>Select Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            recording ? stopRecording() : startRecording();
                        }}
                    >
                        <Text>{recording ? 'Stop Recording' : 'Record Audio'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderMessageAudio = ({ currentMessage }) => {
        const playSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                { uri: currentMessage.audio }
            );
            await sound.playAsync();
        };

        return (
            <View>
                <Button title="Play Audio" onPress={playSound} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: 1, // Current user ID
                }}
                renderInputToolbar={renderInputToolbar}
                renderMessageAudio={renderMessageAudio}
                />
            {renderAttachmentModal()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#fff',
        width:'100%'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    modalButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
});

export default ChatbotScreen;
