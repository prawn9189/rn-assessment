import { Redirect, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { checkLogin, getAllAppts, initDB, seedData } from "@/scripts/database";

import type { Appt } from "@/scripts/database";

function Appointments() {
  const [authUser, setAuthUser] = useState<string>();
  const [appts, setAppts] = useState<Appt[]>([]);

  const router = useRouter();

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
    const result = await getAllAppts();
    setAppts(result as Appt[]);
  }, [getAllAppts]);

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

  const viewAppt = (apptID: number) => {
    router.navigate({ pathname: "/appointment", params: { id: apptID } });
  };

  return (
    <ScrollView>
      {appts.length !== 0 &&
        appts.map((appt, index) => (
          <Card className="bg-zinc-800 mb-4 mx-4" key={index}>
            <CardHeader>
              <CardTitle>{appt.patient}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full"
                onPress={() => viewAppt(appt.id as number)}
              >
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
      {appts.length !== 0 &&
        appts.map((appt, index) => (
          <Card className="bg-zinc-800 mb-4 mx-4" key={index}>
            <CardHeader>
              <CardTitle>{appt.patient}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full"
                onPress={() => viewAppt(appt.id as number)}
              >
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
      {appts.length !== 0 &&
        appts.map((appt, index) => (
          <Card className="bg-zinc-800 mb-4 mx-4" key={index}>
            <CardHeader>
              <CardTitle>{appt.patient}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full"
                onPress={() => viewAppt(appt.id as number)}
              >
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
      {appts.length !== 0 &&
        appts.map((appt, index) => (
          <Card className="bg-zinc-800 mb-4 mx-4" key={index}>
            <CardHeader>
              <CardTitle>{appt.patient}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full"
                onPress={() => viewAppt(appt.id as number)}
              >
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </ScrollView>
  );
}

export default Appointments;
