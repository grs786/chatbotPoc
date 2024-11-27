import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { styles } from "./styles";
import { styles as styles2 } from "../styles";
import Loader from "src/components/Loader";
import { Colors } from "src/Assets/colors";
import ScannerModal from "./ScannerModal";
import VehicleListModal from "./VehicleListModal";
import { IVehicleData } from "src/types/ScrappedVehicleInfo";

export interface IVehicleDetail {
  model: string;
  vinNumber: string;
  connected: boolean;
}

export interface VehicleInfo {
  visible: any;
  onClose: (vehicleDetail?: IVehicleData) => void;
  clearInput: boolean;
}

const VehicleInfoModal: React.FC<VehicleInfo> = ({
  onClose,
  clearInput,
}) => {
  const [vin, setVin] = useState<string>("");
  const [placeholderValue, setPlaceholderValue] = useState<string>("VIN");
  const [loading, setLoading] = useState<boolean>(false);
  const [connectedViaButton, setConnectedViaButton] = useState<boolean>(true);
  const [scannerVisible, setScannerVisible] = useState<boolean>(false);
  const [vehicleListModal, setVehicleListModal] = useState<boolean>(false);
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
  useEffect(() => {
    if (clearInput) {
      setVin("");
      Keyboard.dismiss();
    }
  }, [clearInput]);
  const handleScanner = () => {
    setScannerVisible(true);
  };
  const handleVehicleListModal = () => {
    setVehicleListModal(true);
  };

  const handleVehicleDataFetch = (vehicleData?: IVehicleData) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (vehicleData) {
        onClose({ ...vehicleData, connected: true });
      } else {
        onClose({
          model: "2021 F-150",
          vinNumber: vin,
          connected: false,
        });
      }
    }, 2000);
  };

  const handleVinSubmit = () => {
    if (vin.length > 10) {
      // setConnectedViaButton(false);
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
                  onPress={handleVehicleListModal}
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
                      placeholder={placeholderValue}
                      placeholderTextColor={Colors.NAVYBLUE_SHADE1}
                      value={vin}
                      onChangeText={handleVinChange}
                      maxLength={17}
                      returnKeyType="done"
                      onSubmitEditing={handleVinSubmit}
                      onFocus={() => {
                        setPlaceholderValue("");
                        scrollRef.current?.scrollTo({ y: 300, animated: true });
                      }}
                      onBlur={() => {
                        scrollRef.current?.scrollTo({ y: 0, animated: true });
                        setPlaceholderValue("VIN");
                      }}
                    />
                    <Pressable onPress={handleScanner}>
                      <Image
                        source={require("../../../Assets/images/Scanner.png")}
                        style={styles.scannerImg}
                      />
                    </Pressable>
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
          <ScannerModal
            visible={scannerVisible}
            onClose={() => {
              setScannerVisible(false);
              setVin("1FTVW1ELXPWG02702");
            }}
          />
          <VehicleListModal
            visible={vehicleListModal}
            onClose={() => {
              setVehicleListModal(false);
            }}
            onRowClick={(vehicleData) => {
              handleVehicleDataFetch(vehicleData);
              // selectedData ?? setSelectedVehicleData(selectedData);
              setVehicleListModal(false);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default VehicleInfoModal;
