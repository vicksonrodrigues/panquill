import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  GripVerticalIcon,
  MoreHorizontalIcon,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { isSortable, useSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";
import { RecipeFormValues } from "@/features/recipes/validation";

type SortableRowProps = {
  field: any;
  control: Control<RecipeFormValues>;
  index: number;
  totalFields: number;
  onInsertAbove: (index: number) => void;
  onInsertBelow: (index: number) => void;
  onRemove: (index: number) => void;
};

export default function RecipeStepsFieldArray() {
  const { control } = useFormContext<RecipeFormValues>();
  const { fields, append, remove, move, insert } = useFieldArray({
    control,
    name: "steps",
  });

  const handleAppend = () => {
    append({
      stepNo: fields.length + 1,
      step: "",
    });
  };

  const handleInsertAbove = (index: number) => {
    insert(index, {
      stepNo: index + 1,
      step: "",
    });
  };

  const handleInsertBelow = (index: number) => {
    insert(index + 1, {
      stepNo: index + 2,
      step: "",
    });
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            move(initialIndex, index);
          }
        }
      }}
    >
      <div>
        <div className="flex flex-col border-y divide-y ">
          {fields.map((field, index) => (
            <SortableSteps
              key={field.id}
              field={field}
              index={index}
              control={control}
              totalFields={fields.length}
              onInsertAbove={handleInsertAbove}
              onInsertBelow={handleInsertBelow}
              onRemove={remove}
            />
          ))}
        </div>
        <div className="flex justify-end mt-2">
          <Button onClick={handleAppend}>Add Steps</Button>
        </div>
      </div>
    </DragDropProvider>
  );
}

function SortableSteps({
  field,
  index,
  control,
  onInsertAbove,
  onInsertBelow,
  onRemove,
}: SortableRowProps) {
  const { ref, handleRef, sortable } = useSortable({
    id: field.id,
    index,
  });

  return (
    <div
      key={field.id}
      className={`flex items-start gap-2 p-2
      ${sortable.isDragging ? "opacity-50  border-transparent" : ""}`}
      ref={ref}
    >
      <div className="my-auto">
        <GripVerticalIcon
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing size-4 touch-none"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Controller
          key={field.id}
          name={`steps.${index}.step`}
          control={control}
          render={({ field: controllerField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="font-semibold">
                Step {sortable.index + 1} :
              </FieldLabel>
              <Textarea
                {...controllerField}
                id="form-recipe-step-textarea"
                maxLength={300}
                rows={8}
                className="max-h-50 min-h-0 resize-none"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex my-auto ">
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
            <DropdownMenuItem onClick={() => onInsertAbove(index)}>
              <ArrowUp /> Add Above
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onInsertBelow(index)}>
              <ArrowDown /> Add Below
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onRemove(index)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
