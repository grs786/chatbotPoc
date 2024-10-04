import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomHeader from "../../components/CustomHeader";

const VehicleInfoScreen: React.FC = () => {
  const [vin, setVin] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Vehicle 1", value: "vehicle1" },
    { label: "Vehicle 2", value: "vehicle2" },
  ]);

  const handleVinChange = (value: string) => {
    setVin(value);
    checkIfButtonShouldBeEnabled(value, selectedVehicle);
  };

  const handleVehicleSelection = (value: string | null) => {
    setSelectedVehicle(value);
    checkIfButtonShouldBeEnabled(vin, value);
  };

  const checkIfButtonShouldBeEnabled = (
    vin: string,
    vehicle: string | null
  ) => {
    setIsButtonEnabled(vin.length > 0 || vehicle !== null);
  };

  return (
    <SafeAreaView>
      <CustomHeader title="WSM Assitant" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../Assets/images/googleIcon.png")}
            style={styles.logo}
          />
        </View>

        {/* Input for Vehicle Information Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Vehicle Information Number</Text>
          <TextInput
            style={styles.input}
            placeholder="VIN"
            value={vin}
            onChangeText={handleVinChange}
          />
        </View>

        {/* OR Text */}
        <Text style={styles.orText}>OR</Text>

        {/* Dropdown for Selecting Vehicle Information */}
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

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isButtonEnabled ? "#007AFF" : "#d3d3d3" },
          ]}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>Activate Chatbot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  logoContainer: {
    alignItems: "center",
    marginVertical: 80,
  },
  logo: {
    width: 30,
    height: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: "blue",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    borderColor: "#ccc",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default VehicleInfoScreen;
