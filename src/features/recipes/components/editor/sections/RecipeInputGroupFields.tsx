import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { ComponentPropsWithoutRef } from "react";
import { InputGroupNumberInput } from "@/components/ui/number-input";

// Text Input with Suffix
interface RecipeTextGroupFieldProps {
  name: string;
  label: string;
  suffix: string;
  placeholder?: string;
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof Input>,
    "id" | "aria-invalid"
  >;
  groupProps?: ComponentPropsWithoutRef<typeof InputGroup>;
}

export function RecipeTextGroupField({
  name,
  label,
  suffix,
  placeholder,
  inputProps,
  groupProps,
}: RecipeTextGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <InputGroup {...groupProps}>
            <Input
              {...field}
              {...inputProps}
              id={`form-${name}-input`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder || label}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{suffix}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// Number Input with Suffix
interface RecipeNumberGroupFieldProps {
  name: string;
  label: string;
  suffix: string;
  min?: number;
  max?: number;
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof InputGroupNumberInput>,
    "id" | "min" | "max"
  >;
  groupProps?: ComponentPropsWithoutRef<typeof InputGroup>;
}

export function RecipeNumberGroupField({
  name,
  label,
  suffix,
  min,
  max,
  inputProps,
  groupProps,
}: RecipeNumberGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <InputGroup {...groupProps}>
            <InputGroupNumberInput
              {...field}
              {...inputProps}
              id={`form-${name}-input`}
              min={min}
              max={max}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{suffix}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
