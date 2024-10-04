import React, { useState } from "react";
import { View, Text, TextInput, Image, Modal, Keyboard } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomHeader from "../../../components/CustomHeader";
import { styles } from "../styles";

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
    { label: "Vehicle 1", value: "vehicle1" },
    { label: "Vehicle 2", value: "vehicle2" },
  ]);

  const handleVinChange = (value: string) => {
    setVin(value);

    if (value.length > 0) {
      const typingDelay = setTimeout(() => {
        onClose();
        clearTimeout(typingDelay);
        Keyboard.dismiss();
      }, 1000);
    }
  };

  const handleVehicleSelection = (value: string | null) => {
    setSelectedVehicle(value);

    // Close the modal once a vehicle is selected
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
                source={require("../../../Assets/images/googleIcon.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.inputContainers}>
              <Text style={styles.label}>Enter Vehicle Information Number</Text>
              <TextInput
                style={styles.input}
                placeholder="VIN"
                value={vin}
                onChangeText={handleVinChange}
              />
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
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VehicleInfoModal;
