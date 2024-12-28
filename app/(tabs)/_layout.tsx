import FeatherIcons from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="calendar" size={28} />
          ),
          title: "Appointments",
        }}
      />
      <Tabs.Screen
        name="new-appointment"
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="plus" size={28} />
          ),
          title: "Create New",
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
