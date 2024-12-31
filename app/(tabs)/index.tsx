import { Redirect, useSegments } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { checkLogin, getALlAppts, initDB, seedData } from "@/scripts/database";

import type { Appt } from "@/scripts/database";

function Appointments() {
  const [authUser, setAuthUser] = useState<string>();
  const [appts, setAppts] = useState<Appt[]>([]);

  const segments = useSegments();

  const init = useCallback(async () => {
    await initDB();
    await seedData();
  }, []);

  const getAuthUser = useCallback(async () => {
    const result = await checkLogin();
    setAuthUser(result);
  }, []);

  const getAppts = useCallback(async () => {
    const result = await getALlAppts();
    setAppts(result as Appt[]);
  }, [getALlAppts]);

  useEffect(() => {
    init();
    getAuthUser();
    getAppts();
  }, []);

  /* Fetch on route change */
  useEffect(() => {
    getAppts();
  }, [segments]);

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
