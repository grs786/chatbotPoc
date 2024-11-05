import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles";
import { Colors } from "src/Assets/colors";
import { IVehicle } from "../types";

const RenderVehicleInfo: React.FC<IVehicle> = ({
  vehicleInfo,
  onPress,
  onVehicleTabPress,
}: IVehicle) => {
  const [loadingState, setIsLoadingState] = useState("initial");
  const [vehicleDataState, setVehicleDataState] = useState(
    "Retrieve Vehicle Data"
  );

  const changeState = () => {
    setIsLoadingState("loading");
    setTimeout(() => {
      setIsLoadingState("finished");
    }, 3000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.vehicleDetailsContainer}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../Assets/images/fordLogo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.connectedHeader}>
        <View style={styles.vehicleRowView}>
          <Image
            source={require("../../../Assets/images/vehicleIcon.png")}
            style={styles.vehicleIcon}
          />
          <Text style={styles.vehicleTitle}>Vehicle</Text>
        </View>
        {vehicleInfo?.connected == true && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.connectionStatus}>Connected</Text>
            <View style={styles.statusDot} />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.vehicleInfo}
        activeOpacity={0.8}
        onPress={onVehicleTabPress}
      >
        <Text style={styles.vehicleModel}>
          {`${vehicleInfo?.modelyear} `}
          {vehicleInfo?.model}
        </Text>
        <Text style={styles.vinNumber}>{vehicleInfo?.vin}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          loadingState === "finished"
            ? styles.finishedDataButton
            : styles.viewDataButton
        }
        onPress={changeState}
      >
        {loadingState === "loading" && (
          <ActivityIndicator color={Colors.WHITE} size={"small"} />
        )}
        {loadingState === "finished" && (
          <Image
            style={styles.circleCheck}
            source={require("../../../Assets/images/circleCheck.png")}
          />
        )}
        <Text
          style={[
            styles.viewDataText,
            {
              color:
                loadingState === "finished" ? Colors.BLUE_SHADE1 : Colors.WHITE,
            },
          ]}
        >
          {vehicleDataState}
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.bluebutton,
            { backgroundColor: Colors.NAVYBLUE_SHADE1, width: "100%" },
          ]}
          onPress={onPress}
        >
          <Text style={styles.submittext}>Change VIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RenderVehicleInfo;
