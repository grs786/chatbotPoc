import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "../styles";
import { Colors } from "src/Assets/colors";
import { IVehicleInfo } from "../types";

interface IRenderVehicleInfoProps {
  vehicleInfo: IVehicleInfo;
  onPress: () => void;
}

const RenderVehicleInfo: React.FC<IRenderVehicleInfoProps> = ({
  vehicleInfo,
  onPress,
}: IRenderVehicleInfoProps) => {
  return (
    <View style={styles.vehicleDetailsContainer}>
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

      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleModel}>
          {vehicleInfo?.modelyear}
          {vehicleInfo?.model}
        </Text>
        <Text style={styles.vinNumber}>{vehicleInfo?.vin}</Text>
      </View>
      <TouchableOpacity style={styles.viewDataButton}>
        <Text style={styles.viewDataText}>View Vehicle Data</Text>
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
    </View>
  );
};

export default RenderVehicleInfo;
