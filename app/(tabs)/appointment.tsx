import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "react-native-star-rating-widget";

import { Button } from "@/components/ui/button";
import DataRow from "@/components/ui/data-row";
import { Text } from "@/components/ui/text";
import { checkLogin, getApptByID, updateApptStatus } from "@/scripts/database";

import type { Appt } from "@/scripts/database";

function Appointment() {
  const { id } = useLocalSearchParams();

  const [authUser, setAuthUser] = useState<string>();
  const [curAppt, setCurAppt] = useState<Appt>({} as Appt);

  const router = useRouter();

  const getAuthUser = useCallback(async () => {
    const result = await checkLogin();
    setAuthUser(result);
  }, []);

  const getAppt = useCallback(async () => {
    const result = await getApptByID(parseInt(id as string));
    setCurAppt(result as Appt);
  }, [id]);

  useEffect(() => {
    getAuthUser();
    getAppt();
  }, []);

  useEffect(() => {
    getAppt();
  }, [id]);

  const updateAppt = async (status: string) => {
    await updateApptStatus({ id: parseInt(id as string), status: status });
    router.navigate("/");
  };

  return (
    <SafeAreaView>
      <DataRow label="Patient Name" data={curAppt.patient} />
      <DataRow label="Date" data={curAppt.date} />
      <DataRow label="Time" data={curAppt.time} />
      <DataRow label="Reason" data={curAppt.reason} />
      <DataRow label="Status" data={curAppt.status} />
      <View className="flex flex-row mx-4">
        <Text className="w-1/2 text-lg text-zinc-400">Review</Text>
        <StarRating
          color="white"
          enableHalfStar={false}
          onChange={() => {}}
          rating={curAppt.review ? curAppt.review : 1}
        />
      </View>
      {authUser === "admin" && (
        <View>
          <Button
            className="mt-4"
            onPress={() => updateAppt("completed")}
            disabled={curAppt.status !== "upcoming"}
          >
            <Text>Complete</Text>
          </Button>
          <Button
            className="bg-red-600 mt-4"
            onPress={() => updateAppt("cancelled")}
            disabled={curAppt.status !== "upcoming"}
          >
            <Text className="text-white">Cancel</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Appointment;
