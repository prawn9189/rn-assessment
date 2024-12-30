import { Redirect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { checkLogin, initDB, seedData } from "@/scripts/database";

function Appointments() {
  const [authUser, setAuthUser] = useState<string>();

  const init = useCallback(async () => {
    await initDB();
    await seedData();
  }, []);

  const getAuthUser = useCallback(async () => {
    const result = await checkLogin();
    setAuthUser(result);
  }, []);

  useEffect(() => {
    init();
    getAuthUser();
  }, []);

  if (authUser === "") {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <Text>Appointments</Text>
    </View>
  );
}

export default Appointments;
