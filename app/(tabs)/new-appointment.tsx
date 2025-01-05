import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { saveAppt } from "@/scripts/database";

import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import type { Option } from "@rn-primitives/select";

const schema = z.object({
  patientName: z.coerce
    .string()
    .trim()
    .min(1, { message: "Patient name is invalid." }),
  contactNo: z.coerce
    .string()
    .trim()
    .min(1, { message: "Contact no. is invalid." }),
  date: z.coerce.string().min(1, { message: "Date is not valid." }),
  time: z.coerce.string().min(1, { message: "Time is not valid." }),
  reason: z.coerce
    .string()
    .trim()
    .min(1, { message: "Reason for appointment is invalid." }),
});

const hours = Array.from({ length: 9 }).map((_v, index) => index + 9);

function NewAppointment() {
  const {
    clearErrors,
    control,
    handleSubmit,
    resetField,
    setError,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientName: "",
      contactNo: "",
      date: "",
      time: "",
      reason: "",
    },
  });

  const router = useRouter();

  const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (selectedDate && dayjs(selectedDate).isBefore(dayjs(), "day")) {
      setError("date", { message: "Selected date cannot be older than the current date." });
    } else {
      setValue("date", currentDate!.toLocaleDateString());
      clearErrors("date");
    }
  };

  const createAppointment = async (data: z.infer<typeof schema>) => {
    const apptID = await saveAppt({
      patient: data.patientName,
      contact: data.contactNo,
      date: data.date,
      time: data.time,
      reason: data.reason,
      review: 0,
      status: "upcoming",
    });
    router.navigate(`/ratings/${apptID}`);
  };

  const dateFieldOnFocus = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      onChange: onDateChange,
    });
  };

  const dateFieldOnPress = () => {
    resetField("date");
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      onChange: onDateChange,
    });
  };

  const onTimeChange = (option: Option) => {
    setValue("time", option!.value);
  };

  return (
    <View className="flex flex-col h-screen justify-start px-8">
      <Controller
        control={control}
        name="patientName"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="w-full bg-slate-50 text-black"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Patient Name"
            value={value}
          />
        )}
      />
      {errors.patientName ? (
        <Text className="text-white mb-4">{errors.patientName.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="contactNo"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="w-full bg-slate-50 text-black"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Contact No."
            value={value}
          />
        )}
      />
      {errors.contactNo ? (
        <Text className="text-white mb-4">{errors.contactNo.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="date"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="w-full bg-slate-50 text-black"
            onFocus={dateFieldOnFocus}
            onBlur={onBlur}
            onPress={dateFieldOnPress}
            onChangeText={onChange}
            placeholder="Date"
            value={value}
          />
        )}
      />
      {errors.date ? (
        <Text className="text-white mb-4">{errors.date.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="time"
        render={() => (
          <Select className="w-full" onValueChange={onTimeChange}>
            <SelectTrigger className="bg-slate-50">
              <SelectValue className="text-lg" placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="w-5/6 bg-slate-50">
              <SelectGroup>
                {hours.map((h, index) => (
                  <SelectItem
                    key={index}
                    label={h === 9 ? `0${h}:00` : `${h}:00`}
                    value={h === 9 ? `0${h}:00` : `${h}:00`}
                  >
                    {h === 9 ? `0${h}:00` : `${h}:00`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.time ? (
        <Text className="text-white mb-4">{errors.time.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Controller
        control={control}
        name="reason"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            className="w-full bg-slate-50 text-black"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Reason"
            value={value}
          />
        )}
      />
      {errors.reason ? (
        <Text className="text-white mb-4">{errors.reason.message}</Text>
      ) : (
        <Text className="text-white mb-4"> </Text>
      )}

      <Button
        className="bg-blue-600 mb-4"
        onPress={handleSubmit(createAppointment)}
      >
        <Text className="font-SpaceMono text-white">Create</Text>
      </Button>
    </View>
  );
}

export default NewAppointment;
