import React from "react";
import { Control, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { recipeSchema } from "@/features/recipes/actions/schema";

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  control: Control<typeof recipeSchema>;
};

const FormInput = ({ control,name,placeholder,label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-recipe-${name}`}>{label}</FieldLabel>
        
          <Input
            {...field}
            id={`form-recipe-title-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormInput;


