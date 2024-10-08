import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomHeader from "../../../components/CustomHeader";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

interface VehicleInfoModalProps {
  onClose: (
    vehicleDetails: {
      model: string;
      vinNumber: string;
      connected: boolean;
    } | null
  ) => void;
}

const VehicleInfoModal: React.FC<VehicleInfoModalProps> = ({ onClose }) => {
  const [vin, setVin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [connectedViaButton, setConnectedViaButton] = useState<boolean>(true);
  const [vehicleDetails, setVehicleDetails] = useState<{
    model: string;
    vinNumber: string;
    connected: boolean;
  } | null>(null);

  const navigation = useNavigation();

  const handleVinChange = (value: string) => {
    setVin(value);

    if (value.length > 10) {
      const typingDelay = setTimeout(() => {
        clearTimeout(typingDelay);
        Keyboard.dismiss();
      }, 1000);
    }
  };

  const handleVehicleDataFetch = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVehicleDetails({
        model: "2021 F-150",
        vinNumber: "1FTFW1E85MFA63398",
        connected: connectedViaButton,
      });
      onClose({
        model: "2021 F-150",
        vinNumber: "1FTFW1E85MFA63398",
        connected: connectedViaButton,
      });
    }, 2000);
  };

  const handleConnectVehicle = () => {
    setConnectedViaButton(true);

    handleVehicleDataFetch();
  };

  const handleVinSubmit = () => {
    if (vin.length > 10) {
      setConnectedViaButton(false);

      handleVehicleDataFetch();
    }
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.vechilemodalContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../Assets/images/fordLogo.png")}
              style={styles.logo}
            />
          </View>

          {!loading ? (
            <>
              <TouchableOpacity
                style={[styles.bluebutton]}
                onPress={handleConnectVehicle}
                disabled={loading}
              >
                <Text style={styles.submittext}>Connect to vehicle</Text>
                <Image
                  source={require("../../../Assets/images/sensorsIcon.png")}
                  style={{ width: 25, height: 25, marginLeft: 5 }}
                />
              </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>

              <View style={styles.inputContainers}>
                <Text style={styles.label}>Enter VIN</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="VIN"
                    value={vin}
                    onChangeText={handleVinChange}
                    maxLength={17}
                    returnKeyType="done"
                    onSubmitEditing={handleVinSubmit}
                  />
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={handleVinSubmit}
                  >
                    <Text style={styles.submittext}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" color="#1C4E80" />
          )}
        </View>
      </View>
    </View>
  );
};

export default VehicleInfoModal;
