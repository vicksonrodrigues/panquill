import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Controller, useFormContext } from "react-hook-form";
import { ComponentPropsWithoutRef } from "react";
import { InputGroupNumberInput } from "@/components/ui/number-input";

// Text Input
type RecipeTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof Input>,
    "id" | "aria-invalid"
  >;
};

export function RecipeTextField({
  name,
  label,
  placeholder,
  inputProps,
}: RecipeTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <Input
            {...field}
            {...inputProps}
            id={`form-${name}-input`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder || label}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// Number Input
type RecipeNumberFieldProps = {
  name: string;
  label: string;
  min?: number;
  max?: number;
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof InputGroupNumberInput>,
    "id" | "aria-invalid" | "min" | "max"
  >;
};

export function RecipeNumberField({
  name,
  label,
  min,
  max,
  inputProps,
}: RecipeNumberFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <InputGroupNumberInput
            {...field}
            {...inputProps}
            id={`form-${name}-input`}
            min={min}
            max={max}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
