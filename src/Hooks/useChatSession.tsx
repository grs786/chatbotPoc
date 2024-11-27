import { useEffect, useState } from "react";
import { getItem, setItem } from "src/Utilities/StorageClasses";
import ApiPaths from "src/Common/endpoints";
import { useUserSession } from "src/Hooks/useChatOperations";

const useSessionManager = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [enableUserInputDialog, setEnableUserInputDialog] = useState<boolean>(false);
  const { createUserSession } = useUserSession();

  const initializeSession = async () => {
    await setItem(ApiPaths.ACCESS_TOKEN, "");
    const data = await createUserSession();
    if (data?.access_token) {
      await setItem(ApiPaths.ACCESS_TOKEN, data.access_token);
      setAccessToken(data.access_token);
    }
    const userData = await getItem(ApiPaths.USER_IDENTIFIER);
    setEnableUserInputDialog(!userData);
  };

  useEffect(() => {
    initializeSession();
  }, []);

  return { accessToken, enableUserInputDialog };
};

export default useSessionManager;
