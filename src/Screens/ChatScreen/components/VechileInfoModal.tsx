import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { styles as styles2 } from "../styles";
import Loader from "src/components/Loader";
import { Colors } from "src/Assets/colors";
import ApiPaths from "../../../../environment";

export interface IVehicleDetail {
  model: string;
  vinNumber: string;
  connected: boolean;
}

export interface VehicleInfo {
  visible: any;
  onClose: (vehicleDetail: IVehicleDetail) => void;
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
  const scrollRef = useRef<ScrollView | null>(null);

  const handleVinChange = (value: string) => {
    setVin(value);

    if (value.length > 20) {
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
        vinNumber: vin ?? ApiPaths.SAMPLE_VIN,
        connected: connectedViaButton,
      });
      onClose({
        model: "2021 F-150",
        vinNumber: vin ?? ApiPaths.SAMPLE_VIN,
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

  const isButtonDisabled = vin?.length !== 17;

  return (
    <View style={styles.modalBackground}>
      <View style={styles.vechilemodalContainer}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces
        >
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
                  <Text style={styles2.label}>Enter or Scan VIN</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles2.input}
                      placeholder="VIN"
                      placeholderTextColor={Colors.NAVYBLUE_SHADE1}
                      value={vin}
                      onChangeText={handleVinChange}
                      maxLength={17}
                      returnKeyType="done"
                      onSubmitEditing={handleVinSubmit}
                      onFocus={() =>
                        scrollRef.current?.scrollTo({ y: 300, animated: true })
                      }
                      onBlur={() =>
                        scrollRef.current?.scrollTo({ y: 0, animated: true })
                      }
                    />
                    <Image
                      source={require("../../../Assets/images/Scanner.png")}
                      style={styles.scannerImg}
                    />
                  </View>
                  <Text style={styles.vinDetails}>
                    Has to be a 17 character alphanumeric
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={vin?.length === 17 ? false : true}
                  style={[
                    !isButtonDisabled
                      ? styles.submitButton
                      : styles?.disbaledsubmitButton,
                  ]}
                  onPress={handleVinSubmit}
                >
                  <Text
                    style={[
                      styles2.submittext,
                      {
                        color: isButtonDisabled
                          ? Colors.DISABLED_TEXT
                          : Colors.WHITE,
                      },
                    ]}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>

                <View style={styles.heightAdjuster} />
              </>
            ) : (
              <Loader title="Connecting with vehicle..." />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default VehicleInfoModal;
