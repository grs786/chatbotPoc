import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { styles as styles2 } from "../styles";
import Loader from "src/components/Loader";

export interface IVehicleDetail {
  model: string;
  vinNumber: string;
  connected: boolean;
}

export interface VehicleInfo {
  visible: any;
  onClose: (vehicleDetail: IVehicleDetail | null) => void;
}

const VehicleInfoModal: React.FC<VehicleInfo> = ({ onClose, visible }) => {
  const [vin, setVin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [connectedViaButton, setConnectedViaButton] = useState<boolean>(true);
  const [vehicleDetails, setVehicleDetails] = useState<{
    model: string;
    vinNumber: string;
    connected: boolean;
  } | null>(null);

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
        vinNumber: vin, // "1FTFW1E85MFA63398",
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
                style={[styles2.bluebutton]}
                onPress={handleConnectVehicle}
                disabled={loading}
              >
                <Text style={styles2.submittext}>Connect to vehicle</Text>
                <Image
                  source={require("../../../Assets/images/sensorsIcon.png")}
                  style={{ width: 25, height: 25, marginLeft: 5 }}
                />
              </TouchableOpacity>

              <Text style={styles2.orText}>OR</Text>

              <View style={styles.inputContainers}>
                <Text style={styles2.label}>Enter VIN</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles2.input}
                    placeholder="VIN"
                    value={vin}
                    onChangeText={handleVinChange}
                    maxLength={17}
                    returnKeyType="done"
                    onSubmitEditing={handleVinSubmit}
                  />
                  <TouchableOpacity
                    disabled={vin?.length === 17 ? false : true}
                    style={[
                      vin?.length === 17
                        ? styles.arrowButton
                        : styles?.disbaledArrowButton,
                    ]}
                    onPress={handleVinSubmit}
                  >
                    <Text style={styles2.submittext}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.vinDetails}>
                  Has to be a 17 character alphanumeric
                </Text>
              </View>
            </>
          ) : (
            <Loader title="Connecting with vehicle..." />
          )}
        </View>
      </View>
    </View>
  );
};

export default VehicleInfoModal;
