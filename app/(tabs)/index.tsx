import { Redirect, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { checkLogin, getALlAppts, getRating, initDB, seedData } from "@/scripts/database";

import type { Appt, Rating } from "@/scripts/database";

function Appointments() {
  const [authUser, setAuthUser] = useState<string>();
  const [appts, setAppts] = useState<Appt[]>([]);
  const [rating, setRating] = useState({});

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
    const result = await getALlAppts();
    setAppts(result as Appt[]);
  }, [getALlAppts]);

  const getRatings = useCallback(async () => {
    const result = await getRating();
    setRating(result as Rating);
  }, [getRating]);

  useEffect(() => {
    init();
    getAuthUser();
    getAppts();
    getRatings();
  }, []);

  /* Fetch on route change */
  useEffect(() => {
    getAppts();
  }, [segments]);

  if (authUser === "") {
    return <Redirect href="/login" />;
  }

  const viewAppt = (apptID: number) => {
    router.replace(`/ratings/${apptID}`);
  };

  return (
    <View>
      {appts.length !== 0 &&
        appts.map((appt, index) => (
          <Card className="bg-zinc-800 mb-4 mx-4" key={index}>
            <CardHeader>
              <CardTitle>{appt.patient}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
              <Text className="w-1/2 text-zinc-400">Reason</Text>
              <Text className="w-1/2">{appt.reason}</Text>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onPress={() => viewAppt(appt.id as number)}>
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </View>
  );
}

export default Appointments;
