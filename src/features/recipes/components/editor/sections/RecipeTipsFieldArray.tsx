import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { RecipeFormValues } from "@/features/recipes/validation";

import { ArrowDown, ArrowUp, MoreHorizontalIcon, Trash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function RecipeTipsFieldArray() {
  const { control } = useFormContext<RecipeFormValues>();
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: "tips",
  });

  const handleAppend = () => {
    append({
      tipNo: fields.length + 1,
      tip: "",
    });
  };

  const handleInsertAbove = (index: number) => {
    insert(index, {
      tipNo: index + 1,
      tip: "",
    });
  };

  const handleInsertBelow = (index: number) => {
    insert(index + 1, {
      tipNo: index + 2,
      tip: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col border-y divide-y">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 p-2">
            <div className="flex-1 min-w-0">
              <Controller
                key={field.id}
                control={control}
                name={`tips.${index}.tip`}
                render={({ field: controlledField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold">
                      Tip {index + 1} :
                    </FieldLabel>
                    <Textarea
                      {...controlledField}
                      id="form-recipe-tip-textarea"
                      maxLength={300}
                      rows={8}
                      className="max-h-50 min-h-0 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
            </div>
            <div className="flex my-auto">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleInsertAbove(index)}>
                    <ArrowUp /> Add Above
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleInsertBelow(index)}>
                    <ArrowDown /> Add Below
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleAppend}>+ Add Tip</Button>
      </div>
    </div>
  );
}
