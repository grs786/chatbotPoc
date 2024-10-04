import React, { useState } from "react";
import { View, Text, TextInput, Image, Modal, Keyboard, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomHeader from "../../../components/CustomHeader";
import { styles } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

interface VehicleInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const VehicleInfoModal: React.FC<VehicleInfoModalProps> = ({
  visible,
  onClose,
}) => {
  const [vin, setVin] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "2021 F-150 3.5L CYCLON", value: "vehicle1" },
    { label: "2021 F_170 2.7L V6", value: "vehicle2" },
  ]);

  const handleVinChange = (value: string) => {
    setVin(value);

    // Close the modal when VIN is entered
    if (value.length > 6) {
      const typingDelay = setTimeout(() => {
        onClose();
        clearTimeout(typingDelay);
        Keyboard.dismiss();
      }, 1000);
    }
  };

  const handleVehicleSelection = (value: string | null) => {
    setSelectedVehicle(value);
    if (value !== null) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.vechilemodalContainer}>
          <CustomHeader title="WSM Assistant" />
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../Assets/images/ford.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.inputContainers}>
              <Text style={styles.label}>Enter Vehicle Information Number</Text>
              <View style={styles.textInputContainer}> 
              <TextInput
                style={styles.input}
                placeholder="VIN"
                value={vin}
                onChangeText={handleVinChange}
              />
               <TouchableOpacity style={styles.arrowButton} onPress={() => {}}>
                  <MaterialIcons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.orText}>OR</Text>

            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Select Vehicle Information</Text>
              <DropDownPicker
                open={open}
                value={selectedVehicle}
                items={items}
                setOpen={setOpen}
                setValue={handleVehicleSelection}
                setItems={setItems}
                placeholder="Select an option"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropOptions}
                textStyle={{color:'grey'}}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VehicleInfoModal;
