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
  username: z.coerce.string().trim().min(1, { message: "Email is invalid." }),
  password: z.coerce
    .string()
    .trim()
    .min(1, { message: "Password is invalid." }),
});

function Login() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  const loginUser = async (data: z.infer<typeof schema>) => {
    const result = await login(data.username, data.password);
    if (result) {
      router.replace("/");
    } else {
      setError("root.serverError", { type: "403" });
    }
  };

  return (
    <View className="flex flex-col h-screen justify-center px-8">
      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="bg-slate-50 text-black"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username ? (
        <Text className="text-white mb-4">{errors.username.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="bg-slate-50 text-black"
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
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

      <Button className="bg-blue-600 mb-4" onPress={handleSubmit(loginUser)}>
        <Text className="font-SpaceMono text-white">Login</Text>
      </Button>

      {errors.root?.serverError.type === "403" && (
        <Text className="w-full text-center text-white">
          Email or Password is incorrect.
        </Text>
      )}
    </View>
  );
}

export default Login;
