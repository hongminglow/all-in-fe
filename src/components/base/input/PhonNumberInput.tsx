import React from "react";
import { Controller, useFormState } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { TextInput } from "./TextInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "../../../utils/general";

type PhoneInputProps<T extends FieldValues> = {
  countryName: Path<T>;
  phoneName: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  required?: boolean;
  className?: string;
} & Omit<React.ComponentProps<"input">, "slot">;

export const PhoneNumberInput = <T extends FieldValues>({
  countryName,
  phoneName,
  control,
  rules,
  label,
  required = false,
  className,
  ...inputProps
}: PhoneInputProps<T>) => {
  const { errors } = useFormState({
    name: [countryName, phoneName],
    control,
  });

  const combinedError =
    (errors?.[countryName]?.message as string | undefined) ??
    (errors?.[phoneName]?.message as string | undefined) ??
    "";

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <p className="block text-purple-100 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center">
        <Controller
          name={countryName}
          control={control}
          rules={rules}
          render={({ field }) => {
            return (
              <div className="flex flex-col space-y-1">
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    field.onBlur();
                  }}
                >
                  <SelectTrigger
                    className={cn(className, "p-0 px-1.5 w-fit max-w-18 mb-0")}
                  >
                    <SelectValue defaultValue="60" />
                  </SelectTrigger>
                  <SelectContent className="min-w-20">
                    <SelectGroup>
                      <SelectItem value="60">+60</SelectItem>
                      <SelectItem value="65">+65</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />

        <Controller
          name={phoneName}
          control={control}
          rules={rules}
          render={({ field }) => {
            return (
              <TextInput
                className={className}
                control={control}
                disabledError
                {...inputProps}
                {...field}
              />
            );
          }}
        />
      </div>

      {combinedError && (
        <p className="font-semibold text-sm text-red-500">{combinedError}</p>
      )}
    </div>
  );
};
