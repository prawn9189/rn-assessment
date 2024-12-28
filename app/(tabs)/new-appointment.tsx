import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function NewAppointment() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
    >
      <Text>Add new appointment</Text>
    </View>
  );
}

export default NewAppointment;
