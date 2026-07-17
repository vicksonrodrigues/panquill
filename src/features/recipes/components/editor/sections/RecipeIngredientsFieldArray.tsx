import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RecipeFormValues } from "@/features/recipes/validation";

import { Trash } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { RecipeCreatableSelect, SelectOption } from "./RecipeCreatableSelect";

const tagItem: SelectOption[] = [
  { id: "1", label: "Under 15 mins", value: "Under 15 mins" },
  { id: "2", label: "Gym Recipes", value: "Gym Recipes" },
  { id: "3", label: "Keto", value: "Keto" },
  { id: "4", label: "Healthy", value: "Healthy" },
];

export default function RecipeIngredientsFieldArray() {
  const { control } = useFormContext<RecipeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Header — hidden on mobile since fields stack */}
      <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_36px] gap-3 px-1">
        <span className="text-sm font-semibold">Name</span>
        <span className="text-sm font-semibold">Quantity</span>
        <span />
      </div>

      {/* Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-[1fr_36px] sm:grid-cols-[2fr_1fr_36px] gap-2 sm:gap-3 items-start"
        >
          {/* Name — full width on mobile, takes remaining space on desktop */}

          <RecipeCreatableSelect
            name={`ingredients.${index}.ingredient`}
            options={tagItem}
            isClearable
          />

          {/* Quantity — spans both cols on mobile to sit under Name, fixed 120px on desktop */}
          <Controller
            name={`ingredients.${index}.quantity`}
            control={control}
            render={({ field: controllerField, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-start-1 col-end-2 sm:col-auto"
              >
                <Input
                  {...controllerField}
                  id={`form-recipe-ingredientquantity-input-${index}`}
                  aria-invalid={fieldState.invalid}
                  placeholder="QTY"
                  className="h-8 "
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Delete — always top-right */}
          <Button
            variant="destructive"
            size="icon"
            className="row-start-1 col-start-2 sm:col-start-3 self-start mt-0.5"
            onClick={() => remove(index)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-end pt-1">
        <Button
          type="button"
          onClick={() => append({ ingredient: null, quantity: "" })}
        >
          + Add Ingredient
        </Button>
      </div>
    </div>
  );
}
