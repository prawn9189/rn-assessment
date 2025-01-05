import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import DataRow from "@/components/ui/data-row";
import { getRating } from "@/scripts/database";

import type { Rating } from "@/scripts/database";

function Reviews() {
  const [rating, setRating] = useState<Rating>({
    avg: 0.0,
    total: 0,
    sum: 0,
  });

  console.log(rating);

  const getAggRating = useCallback(async () => {
    const result = await getRating();
    setRating(result as Rating);
  }, [getRating]);

  useEffect(() => {
    getAggRating();
  }, []);

  return (
    <SafeAreaView>
      <DataRow label="Average Rating" data={rating.avg.toString()} />
      <DataRow label="Total Reivews" data={rating.total.toString()} />
    </SafeAreaView>
  );
}

export default Reviews;
