import { jwtDecode } from "jwt-decode";
import { useUserSession } from "src/Hooks/useChatOperations";
import { DecodedToken } from "src/Screens/ChatScreen/types";
import { IDTC_CODES } from "src/types/ScrappedVehicleInfo";

export function get_url_extension(url: string) {
  return url?.split(".").pop().split(/\#|\?/)[0];
}

export const updateArray = (array: any[], newObject: { forId: string }) => {
  const index = array.findIndex(
    (item: { forId: string }) => item.forId === newObject.forId
  );
  if (index !== -1) {
    // If the object exists, replace it
    const updatedArray = array.map((item: any, idx: any) =>
      idx === index ? newObject : item
    );
    return updatedArray;
  } else {
    // If the object does not exist, push the new object
    return [...array, newObject];
  }
};

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@ford\.com$/;
  return emailRegex.test(email);
}

export function formatDtcCodes(dtcCodes: IDTC_CODES[]) {
  return dtcCodes
    .map(
      (item: IDTC_CODES) =>
        (item.Module !== "" ||
          item.DTC_Code !== "" ||
          item.Failure_Type !== "") &&
        `${item.Module} | ${item.DTC_Code} : ${item.Failure_Type}`
    )
    .join(", ");
}

export const manageToken = (token: string, refreshToken: () => void) => {
  if (!token) {
    console.error("No access token provided");
    return;
  }

  // Decode the token to get expiration time
  const decoded: DecodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  // Calculate remaining time before expiration in milliseconds
  const timeToExpire = (decoded.exp - currentTime) * 1000;
  // Set up a timeout to refresh the token shortly before it expires
  if (timeToExpire > 0) {
    setTimeout(async () => {
      // Call the refresh token function
      refreshToken();
      // Optionally, you could manage the new token here (e.g., save it, re-apply manageToken with new token)
    }, timeToExpire - 60000); // Refresh 1 minute before expiration
  } else {
    refreshToken();
  }
};
