import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

interface CustomCheckboxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.checkbox}
      onPress={() => onValueChange(!value)}
    >
      {value && <View style={styles.checkedBox} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.DISABLED_TEXT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
  },
  checkedBox: {
    width: 10,
    height: 10,
    backgroundColor: Colors.NAVYBLUE,
    borderRadius: 2,
  },
});

export default CustomCheckbox;
