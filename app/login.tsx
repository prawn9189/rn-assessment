import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { login } from "@/scripts/database";

const schema = z.object({
  email: z.coerce.string().trim().email({ message: "Email is invalid." }),
  password: z.coerce
    .string()
    .trim()
    .min(1, { message: "Password is invalid." }),
});

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const loginUser = async () => {
    await login();
    router.replace("/");
  };

  return (
    <View className="flex flex-col h-screen justify-center px-8">
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="bg-slate-50"
            placeholder="Email"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.email ? (
        <Text className="text-white mb-4">{errors.email.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="bg-slate-50"
            placeholder="Password"
            onBlur={onBlur}
            onChange={onChange}
            textContentType="password"
            value={value}
          />
        )}
      />
      {errors.password ? (
        <Text className="text-white mb-4">{errors.password.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Button className="bg-blue-600" onPress={handleSubmit(loginUser)}>
        <Text className="font-SpaceMono text-white">Login</Text>
      </Button>
    </View>
  );
}

export default Login;
