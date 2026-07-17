import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export interface ComboboxOption {
  id: string;
  value: string;
  label: string;
}

interface CreatableSelectProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  options: ComboboxOption[];
  placeholder?: string;
  emptyText?: string;
  mode?: "single" | "multiple";
  disabled?: boolean;
  showClear?: boolean;
}

export function CreatableSelect<TFieldValues extends FieldValues>({
  field,
  options,
  placeholder = "Select option...",
  emptyText = "No option found.",
  mode = "single",
  disabled = false,
  showClear = false,
}: CreatableSelectProps<TFieldValues>) {
  const selectedSingleValue =
    options.find((opt) => opt.id === field.value?.id) ?? null;

  const selectedOptions: ComboboxOption[] = Array.isArray(field.value)
    ? field.value
    : [];

  const selectedMultipleValue = selectedOptions
    .map((selected: ComboboxOption) =>
      options.find((opt) => opt.id === selected.id),
    )
    .filter(Boolean);
  if (mode === "multiple") {
    return (
      <Combobox
        items={options}
        multiple
        value={selectedMultipleValue}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <ComboboxChips>
          <ComboboxValue>
            {field.value.map((value: ComboboxOption) => (
              <ComboboxChip key={value.id}>{value.label}</ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder={placeholder} />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(option: ComboboxOption) => (
              <ComboboxItem key={option.id} value={option}>
                {option.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  }

  return (
    <Combobox
      items={options}
      value={selectedSingleValue}
      onValueChange={(value) => {
        console.log("Field Values", field.value);
        console.log("Values", value);
        field.onChange(value);
      }}
      disabled={disabled}
    >
      <ComboboxInput placeholder={placeholder} showClear={showClear} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem key={option.value} value={option}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
