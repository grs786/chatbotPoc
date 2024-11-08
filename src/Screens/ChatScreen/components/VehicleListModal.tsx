import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors } from "src/Assets/colors";
import { IVehicleData, VehicleData } from "src/types/ScrappedVehicleInfo";
interface VehicleModalProps {
  visible: boolean;
  onClose: () => void;
  onRowClick: (vehicle?: IVehicleData) => void;
}

const VehicleListModal: React.FC<VehicleModalProps> = ({
  visible,
  onClose,
  onRowClick,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.overlay} onPress={() => onClose()}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Connect to vehicle</Text>
          <View style={styles.divider} />

          <ScrollView style={styles.vehicleListContainer}>
            <Text style={styles.sectionHeader}>Available vehicles</Text>
            {VehicleData.map((vehicle, index) => (
              <Text
                onPress={() => onRowClick(vehicle)}
                key={`available-${index}`}
                style={styles.vehicleName}
              >
                {vehicle.Selected_VIN}
              </Text>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: "50%",
    minHeight: "45%",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.NAVYBLUE,
    textAlign: "left",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  vehicleListContainer: {
    width: "100%",
    height: "42%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  vehicleName: {
    fontSize: 14,
    color: Colors.NAVYBLUE,
    lineHeight: 40,
    fontWeight: "400",
  },
  divider: {
    height: 2,
    backgroundColor: Colors.GREY,
  },
});

export default VehicleListModal;
