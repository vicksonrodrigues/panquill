import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import z from "zod";
import { recipeSchema } from "../actions/schema";
import { Input } from "@/components/ui/input";

type RecipeFormType<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
};

export const RecipeForm = ({
  form,
  onSubmit,
}: RecipeFormType<z.infer<typeof recipeSchema>>) => {
  return (
    <div>
      <form
        className="w-full max-w-sm"
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log("Validation errors:", errors),
        )}
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-recipe-title">
                  Recipe Title
                </FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
