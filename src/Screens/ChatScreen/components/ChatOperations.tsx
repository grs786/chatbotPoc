import { useState } from 'react';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { usePostChatData, useUpdateThreadData, useCreateUserStep } from '../../../Hooks/useChatOperations';
import {Message} from '../types'

export const useChatOperations = (
  accessToken: string,
  sessionId: string,
  userId: string,
  userIdentifier: string,
  setMessages: (messages:Message) => void,
  setInputText: (text: string) => void
) => {
  const { PostChatData } = usePostChatData();
  const { updateThreadData } = useUpdateThreadData();
  const { createUserStep } = useCreateUserStep();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const handleSend = async (inputText:string) => {
    const newMessage = { _id: Math.random().toString(), text: inputText, createdAt: new Date(), user: { _id: 1, name: 'Tech' } };
    setMessages((prev) => [...prev, newMessage]);

    const chatParam = { accessToken, vinNumber: 'SAMPLE_VIN', question: inputText };
    const updateThreadBody = { uuid: sessionId, name: inputText, userId, userEmail: userIdentifier, accessToken };

    try {
      const chatRespData = await PostChatData(chatParam);
      const botMessage = { _id: Math.random().toString(), text: chatRespData.answer, createdAt: new Date(), user: { _id: 2, name: 'WSM\nBot' } };
      setMessages((prev) => [...prev, botMessage]);

      const userStepBody = { paramsData: { input: inputText, output: chatRespData.answer }, accessToken };
      await createUserStep(userStepBody);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    setInputText('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1 });
    if (!result.canceled) {
      const newMessage = { _id: Math.random().toString(), image: result.assets[0].uri, createdAt: new Date(), user: { _id: 1, name: 'Y' } };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const startRecording = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (granted) {
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      const newMessage = { _id: Math.random().toString(), audio: uri, createdAt: new Date(), user: { _id: 1, name: 'Y' } };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return { handleSend, pickImage, startRecording, stopRecording };
};
