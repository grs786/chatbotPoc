import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Set a value in AsyncStorage
 * @param {string} key - The key under which to store the value
 * @param {string|unknown} value - The value to store
 */
export const setItem = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value); // Convert value to string
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error setting item in AsyncStorage:", error);
    return error;
  }
};

/**
 * Get a value from AsyncStorage
 * @param {string} key - The key to retrieve the value
 * @returns {Promise<string|unknown>} - The retrieved value
 */
export const getItem = async (key: string): Promise<string | unknown> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null; // Parse string back to original type
  } catch (error) {
    console.error("Error getting item from AsyncStorage:", error);
    return error;
  }
};

/**
 * Remove a value from AsyncStorage
 * @param {string} key - The key of the item to remove
 */
export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from AsyncStorage:", error);
    return error;
  }
};

/**
 * Clear all AsyncStorage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
    return error;
  }
};
