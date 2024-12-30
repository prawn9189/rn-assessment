import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

import { login } from "@/scripts/database";

function Login() {
  const router = useRouter();

  const loginUser = async () => {
    await login();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Button onPress={loginUser} title="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
});

export default Login;
