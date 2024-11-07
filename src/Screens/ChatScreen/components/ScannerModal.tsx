import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "src/Assets/colors";

interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.brightbox} onPress={onClose}>
            <Image
              source={require("../../../Assets/images/brightness.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require("../../../Assets/images/closeIcon.png")}
              style={{ width: 25, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.centreView}>
          <Text numberOfLines={2} style={styles.dummyText}>
            This is a dummy screen
          </Text>

          <View style={styles.scannerFrame}>
            <Text style={styles.centerText}>Center Barcode or Text</Text>
            <View style={styles.barcodeContainer}>
              <Image
                source={require("../../../Assets/images/scannerImage.png")}
                style={styles.barcodeImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.warningText}>Avoid glares and shadows</Text>
          </View>

          <Text style={styles.dummyText}>This is a dummy screen</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 10,
    marginVertical: 80,
    marginHorizontal: 20,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  closeButton: {
    zIndex: 1,
  },
  brightbox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    alignContent: "center",
    justifyContent: "center",
    borderColor: Colors.GREY,
  },
  dummyText: {
    color: "white",
    fontSize: 16,
    marginVertical: 20,
    width: "40%",
  },
  scannerFrame: {
    width: "90%",
    alignItems: "center",
    borderColor: "white",
    padding: 16,
    marginVertical: 20,
  },
  centreView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 80,
  },
  centerText: {
    color: "grey",
    fontSize: 11,
    marginBottom: 10,
  },
  barcodeContainer: {
    width: "160%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    position: "relative",
  },
  barcodeImage: {
    width: "80%",
    height: "100%",
  },

  warningText: {
    color: "grey",
    fontSize: 11,
    marginTop: 10,
  },
});

export default ScannerModal;
