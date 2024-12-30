import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { login } from "@/scripts/database";

function Login() {
  const router = useRouter();

  const loginUser = async () => {
    await login();
    router.replace("/");
  };

  return (
    <View className="flex flex-col h-screen justify-center px-8">
      <Input className="bg-slate-50 mb-8" placeholder="Email" />
      <Input
        className="bg-slate-50 mb-8"
        placeholder="Password"
        textContentType="password"
      />
      <Button className="bg-blue-600" onPress={loginUser}>
        <Text className="font-SpaceMono text-white">Login</Text>
      </Button>
    </View>
  );
}

export default Login;
