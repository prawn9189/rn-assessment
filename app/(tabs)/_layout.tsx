import FeatherIcons from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { checkLogin, logout } from "@/scripts/database";

import Appointments from "./index";
import NewAppointment from "./new-appointment";
import Reviews from "./reviews";

const Tab = createBottomTabNavigator();

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

  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Appointments}
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcons color={color} name="calendar" size={28} />
          ),
          headerShown: true,
          headerRight: () => (
            <FeatherIcons onPress={logoutUser} name="log-out" size={28} />
          ),
          title: "Appointments",
        }}
      />
      {authUser === "user" && (
        <Tab.Screen
          component={NewAppointment}
          name="new-appointment"
          options={{
            tabBarIcon: ({ color }) => (
              <FeatherIcons color={color} name="plus" size={28} />
            ),
            title: "Create New",
          }}
        />
      )}
      {authUser === "admin" && (
        <Tab.Screen
          component={Reviews}
          name="reviews"
          options={{
            tabBarIcon: ({ color }) => (
              <FeatherIcons color={color} name="plus" size={28} />
            ),
            title: "Reviews",
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default TabLayout;
