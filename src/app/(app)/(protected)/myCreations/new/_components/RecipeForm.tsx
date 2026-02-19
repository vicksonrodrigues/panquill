"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { recipeSchema } from "@/features/recipes/actions/schema";
import RecipeImagePicker from "@/features/recipes/components/RecipeImagePicker";
import {
  ComboboxOption,
  FormCombobox,
} from "@/components/customSelect/CreatableSelect";

const tagItem: ComboboxOption[] = [
  {
    id: "1",
    label: "Under 15 mins",
    value: "Under 15 mins",
  },
  {
    id: "2",
    label: "Gym Recipes",
    value: "Gym Recipes",
  },
  {
    id: "3",
    label: "Keto",
    value: "Keto",
  },
  {
    id: "4",
    label: "Healthy",
    value: "Healthy",
  },
];

export default function RecipeForm() {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      imgUrl: "",
      prepTime: 0,
      cookTime: 0,
      serving: 1,
      tags: [],
    },
  });

  const onSubmit = (data: z.infer<typeof recipeSchema>) => {
    console.log("Submit Data", data);
  };

  return (
    <div className=" w-full flex justify-center">
      <Card className="w-full mx-4">
        <CardContent>
          <form
            className="w-full max-w-sm"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title-recipe-form-label">
                      Recipe Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="title-recipe-form-input"
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
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/200 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <RecipeImagePicker />
              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-tags">Tags</FieldLabel>
                    <FormCombobox
                      field={field}
                      options={tagItem}
                      mode="multiple"
                      showClear
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="prepTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-recipe-prepTime">
                      Preparation Time
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-rhf-demo-prepTime"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText className="tabular-nums">
                          minutes
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="cookTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-recipe-cookTime">
                      Cooking Time
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-cookTime"
                      aria-invalid={fieldState.invalid}
                      placeholder="minutes"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="serving"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-recipe-prepTime">
                      Serving
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-serving"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText className="tabular-nums">
                          minutes
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
