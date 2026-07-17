import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { ComponentPropsWithoutRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RecipeTextareaGroupFieldProps {
  name: string;
  label: string;
  maxLength: number;
  rows?: number;
  placeholder?: string;
  addonAlign?: "inline-start" | "inline-end" | "block-start" | "block-end";
  textareaProps?: Omit<
    ComponentPropsWithoutRef<typeof InputGroupTextarea>,
    "id" | "aria-invalid" | "rows"
  >;
  groupProps?: ComponentPropsWithoutRef<typeof InputGroup>;
  addonProps?: Omit<ComponentPropsWithoutRef<typeof InputGroupAddon>, "align">;
}

export function RecipeTextareaGroupField({
  name,
  label,
  maxLength,
  rows = 6,
  placeholder,
  addonAlign = "block-end",
  textareaProps,
  groupProps,
  addonProps,
}: RecipeTextareaGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <InputGroup {...groupProps}>
            <InputGroupTextarea
              {...field}
              {...textareaProps}
              id={`form-${name}-textarea`}
              rows={rows}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
            <InputGroupAddon align={addonAlign} {...addonProps}>
              <InputGroupText className="tabular-nums">
                {field.value?.length || 0}/{maxLength} characters
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface RecipeTextareaFieldProps {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
  textareaProps?: Omit<
    ComponentPropsWithoutRef<typeof Textarea>,
    "id" | "aria-invalid" | "rows"
  >;
}

export function RecipeTextareaField({
  name,
  label,
  rows = 4,
  placeholder,
  textareaProps,
}: RecipeTextareaFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${name}-label`}>{label}</FieldLabel>
          <Textarea
            {...field}
            {...textareaProps}
            id={`form-${name}-textarea`}
            rows={rows}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder || label}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
