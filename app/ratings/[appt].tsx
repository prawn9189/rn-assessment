import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "react-native-star-rating-widget";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { saveRating } from "@/scripts/database";

function Rating() {
  const { appt } = useLocalSearchParams();

  const [rating, setRating] = useState(0);

  const router = useRouter();

  const submitRating = async () => {
    await saveRating({ apptID: parseInt(appt as string), rating: rating });
    router.replace("/");
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col h-full items-center justify-center">
        <Text className="text-2xl">Thank you for</Text>
        <Text className="text-2xl mb-4">using our booking system.</Text>
        <Text className="text-xl mb-4">Please rate the system below.</Text>
        <StarRating
          color="white"
          enableHalfStar={false}
          onChange={setRating}
          rating={rating}
        />
        <Button className="mt-6" onPress={submitRating}>
          <Text>Go abck</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Rating;
