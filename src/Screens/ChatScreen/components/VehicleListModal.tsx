import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Colors } from "src/Assets/colors";

interface VehicleModalProps {
  visible: boolean;
  onClose: () => void;
}

const availableVehicles = [
  "Vehicle Name 1",
  "Vehicle Name 2",
  "Vehicle Name 3",
  "Vehicle Name 4",
  "Vehicle Name 5",
  "Vehicle Name 6",
  "Vehicle Name 7",
  "Vehicle Name 8",
];

const VehicleListModal: React.FC<VehicleModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Connect to vehicle</Text>
          <View style={styles.divider} />

          <ScrollView style={styles.vehicleListContainer}>
            <Text style={styles.sectionHeader}>Available vehicles</Text>
            {availableVehicles.map((vehicle, index) => (
              <Text key={`available-${index}`} style={styles.vehicleName}>
                {vehicle}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Pressable>
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
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
    color: Colors.NAVYBLUE,
    marginBottom: 10,
    textAlign: "left",
  },
  vehicleListContainer: {
    width: "100%",
    height: "42%",
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vehicleName: {
    fontSize: 16,
    color: Colors.NAVYBLUE,
    marginVertical: 8,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.GREY,
    marginVertical: 10,
  },
});

export default VehicleListModal;
