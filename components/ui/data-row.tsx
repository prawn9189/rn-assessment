import { View } from "react-native";

import { Text } from "./text";

type DataRowProps = {
  label: string;
  data: string;
};

function DataRow({ label, data }: DataRowProps) {
  return (
    <View className="flex flex-row mx-4">
      <Text className="w-1/2 text-lg text-zinc-400">{label}</Text>
      <Text className="w-1/2 text-lg">{data}</Text>
    </View>
  );
}

export default DataRow;
