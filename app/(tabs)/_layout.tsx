import FeatherIcons from "@expo/vector-icons/Feather";
import { Tabs, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { checkLogin, logout } from "@/scripts/database";

function TabLayout() {
  const [authUser, setAuthUser] = useState<string>();

  const router = useRouter();

  const getUser = useCallback(async () => {
    const result = await checkLogin();
    setAuthUser(result);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const logoutUser = async () => {
    await logout();
    router.replace("/login");
  };

  const backToAppts = () => {
    router.replace("/(tabs)");
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="calendar" size={28} />
          ),
          headerShown: true,
          headerRight: () => (
            <FeatherIcons
              color="white"
              onPress={logoutUser}
              name="log-out"
              size={28}
              style={{ paddingRight: 12 }}
            />
          ),
          title: "Appointments",
        }}
      />
      <Tabs.Screen
        name="new-appointment"
        options={{
          headerTitle: "Create New Appointment",
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="plus" size={28} />
          ),
          title: "Create New",
          href: authUser !== "user" ? null : "/new-appointment",
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="star" size={28} />
          ),
          title: "Reviews",
          href: authUser !== "admin" ? null : "/reviews",
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          headerLeft: () => (
            <FeatherIcons
              color="white"
              onPress={backToAppts}
              name="arrow-left"
              size={28}
            />
          ),
          tabBarItemStyle: { display: "none" },
          title: "View Appointment",
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
