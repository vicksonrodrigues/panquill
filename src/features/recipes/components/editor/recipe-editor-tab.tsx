import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import React from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecipeFormValues } from "../../validation";
import { ComboboxOption } from "@/components/shared/custom-select/CreatableSelects";
import RecipeImagePicker from "./sections/RecipeImagePicker";
import RecipeIngredientsFieldArray from "./sections/RecipeIngredientsFieldArray";
import RecipeStepsFieldArray from "./sections/RecipeStepsFieldArray";
import RecipeTipsFieldArray from "./sections/RecipeTipsFieldArray";
import { RecipeTextField } from "./sections/RecipeInputFields";
import { RecipeNumberGroupField } from "./sections/RecipeInputGroupFields";
import { RecipeTextareaGroupField } from "./sections/RecipeTextAreaFields";
import { RecipeCreatableSelect } from "@/features/recipes/components/editor/sections/RecipeCreatableSelect";

type RecipeFormType<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
};

const tagItem: ComboboxOption[] = [
  {
    id: "1",
    label: "Under 15 mins",
    value: "under15mins",
  },
  {
    id: "2",
    label: "Gym Recipes",
    value: "gymrecipes",
  },
  {
    id: "3",
    label: "Keto",
    value: "keto",
  },
  {
    id: "4",
    label: "Healthy",
    value: "healthy",
  },
  {
    id: "5",
    label: "Dessert",
    value: "dessert",
  },
  {
    id: "6",
    label: "Fast Food",
    value: "fastfood",
  },
  {
    id: "7",
    label: "Indian",
    value: "indian",
  },
  {
    id: "8",
    label: "Chinese",
    value: "chinese",
  },
  {
    id: "9",
    label: "Late Night Snack",
    value: "latenightsnack",
  },
];

export const RecipeEditorTab = ({
  onSubmit,
}: RecipeFormType<RecipeFormValues>) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<RecipeFormValues>();

  return (
    <form
      id="form-rhf-demo"
      onSubmit={handleSubmit(onSubmit, (errors) =>
        console.log("Validation errors:", errors),
      )}
    >
      <Card className="w-full bg-card ">
        <CardHeader>
          <CardTitle className="font-bold text-xl ">Recipe Form</CardTitle>
        </CardHeader>

        <CardContent className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 ">
          <div className="flex flex-col gap-3">
            {/* Recipe Information */}
            <FieldSet>
              <FieldLegend className="font-semibold">
                Recipe Information
              </FieldLegend>

              <FieldGroup className="@container/field-group">
                <RecipeTextField
                  name="title"
                  label="Title"
                  placeholder="Title"
                />

                <RecipeTextareaGroupField
                  name="description"
                  label="Description"
                  maxLength={200}
                  rows={6}
                  addonAlign="block-end"
                  textareaProps={{ className: "min-h-24 resize-none" }}
                />

                <RecipeImagePicker name="imgPreviewUrl" label="Upload Image" />

                <RecipeCreatableSelect
                  name="course"
                  label="Course"
                  options={tagItem}
                  isClearable
                />

                <RecipeCreatableSelect
                  name="cuisine"
                  label="Cuisine"
                  options={tagItem}
                  isMulti
                  isClearable
                />

                <RecipeCreatableSelect
                  name="tags"
                  label="Tags"
                  options={tagItem}
                  isMulti
                  isClearable
                />
              </FieldGroup>
            </FieldSet>
            {/* Time and Servings */}
            <FieldSet>
              <FieldLegend className="font-semibold">
                Time & Serving
              </FieldLegend>
              <FieldGroup className="@container/field-group">
                <div className="grid grid-cols-3 gap-4">
                  <RecipeNumberGroupField
                    name="prepTime"
                    label="Prep Time"
                    suffix="minutes"
                    min={0}
                  />
                  <RecipeNumberGroupField
                    name="cookTime"
                    label="Cook Time"
                    suffix="minutes"
                    min={0}
                  />
                  <RecipeNumberGroupField
                    name="passiveTime"
                    label="Waiting Time"
                    suffix="minutes"
                    min={0}
                  />
                  <RecipeNumberGroupField
                    name="serving"
                    label="Serving"
                    suffix="person"
                    min={1}
                  />
                </div>
              </FieldGroup>
            </FieldSet>
            {/* Tools and Equipment */}
            <FieldSet>
              <FieldLegend className="font-semibold">
                Tools & Equipment
              </FieldLegend>
              <FieldGroup>
                <RecipeCreatableSelect
                  name="tools"
                  options={tagItem}
                  isMulti
                  isClearable
                />
              </FieldGroup>
            </FieldSet>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <FieldSet>
              <FieldLegend className="font-semibold">Ingredients</FieldLegend>
              <FieldGroup>
                <RecipeIngredientsFieldArray />
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend className="font-semibold">Steps</FieldLegend>
              <FieldGroup>
                <RecipeStepsFieldArray />
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend className="font-semibold">Tips & Tricks</FieldLegend>
              <FieldGroup>
                <RecipeTipsFieldArray />
              </FieldGroup>
            </FieldSet>
          </div>
        </CardContent>

        <CardFooter className="ml-auto">
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
};
