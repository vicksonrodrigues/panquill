import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Controller, useFormContext } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import {
    ClassNamesConfig,
    ClearIndicatorProps,
    DropdownIndicatorProps,
    GroupBase,
    MultiValueRemoveProps,
    OptionProps,
    StylesConfig,
    components,
} from 'react-select'
import { cn } from '@/lib/utils'
import { Check, ChevronDownIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface AsyncSelectOption<T = string> {
    id: string
    value: string
    label: string
}

interface AsyncOptions<T = string> {
    [key: string]: AsyncSelectOption<T>[]
}

interface RecipeAsyncCreatableSelectProps<T = string> {
    name: string
    label?: string
    options?: AsyncOptions<T> | SelectOption[]
    placeholder?: string
    isMulti?: boolean
    isClearable?: boolean
    isDisabled?: boolean
    isLoading?: boolean
    loadingMessage?: string
    classname?: ClassNamesConfig<
        AsyncSelectOption<T>,
        boolean,
        GroupBase<AsyncSelectOption<T>>
    >
    loadOptions?: (
        searchValue: string
    ) => Promise<SelectOption[]> | SelectOption[]
}

export interface SelectOption {
    id: string
    value: string
    label: string
}

const selectStyles = {
    controlStyles: {
        base: 'flex !min-h-8 w-full rounded-md border border-input bg-clip-padding px-2 py-0.5 gap-1 text-xs transition-colors hover:cursor-pointer',
        focus: 'border-ring ring-2 ring-ring/30',
        disabled: 'cursor-not-allowed opacity-50',
    },
    placeholderStyles: 'text-muted-foreground text-xs',
    valueContainerStyles: 'gap-1 py-0.5',
    singleValueStyles: 'text-foreground text-xs',
    multiValueStyles:
        'inline-flex items-center gap-2 rounded-xl bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-semibold transition-colors',
    multiValueRemove:
        'text-secondary-foreground hover:text-foreground hover:bg-transparent opacity-50 hover:opacity-100 rounded-xs',
    indicatorsContainerStyles: 'gap-1',
    clearIndicatorStyles: 'rounded-md hover:text-foreground',
    indicatorSeparatorStyles: 'bg-muted my-1 mx-1',
    dropdownIndicatorStyles: 'rounded-md',
    menu: 'z-50 my-1.5 p-1.5 bg-popover dark:bg-popover text-popover-foreground text-xs ring-ring/10 rounded-lg shadow-lg ring',
    groupHeadingStyles:
        'py-2 px-1 text-secondary-foreground text-sm font-semibold',
    optionStyles: {
        base: 'hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-sm !text-xs !cursor-default !select-none !outline-none font-sans',
        focus: 'active:bg-accent/90 bg-accent text-accent-foreground',
        disabled: 'pointer-events-none opacity-50',
        selected: '',
    },
    noOptionsMessageStyles:
        'text-muted-foreground py-4 text-center text-sm border border-border rounded-sm',
    label: 'text-muted-foreground text-sm',
    loadingIndicatorStyles:
        'flex items-center justify-center h-4 w-4 opacity-50',
    loadingMessageStyles: 'text-accent-foreground p-2 bg-accent',
}

const createClassNames = (
    classNames: ClassNamesConfig<
        AsyncSelectOption<SelectOption>,
        boolean,
        GroupBase<AsyncSelectOption<SelectOption>>
    >
): ClassNamesConfig<
    AsyncSelectOption<SelectOption>,
    boolean,
    GroupBase<AsyncSelectOption<SelectOption>>
> => {
    return {
        clearIndicator: (state) =>
            cn(
                selectStyles.clearIndicatorStyles,
                classNames?.clearIndicator?.(state)
            ),
        container: (state) => cn(classNames?.container?.(state)),
        control: (state) =>
            cn(
                selectStyles.controlStyles.base,
                state.isDisabled && selectStyles.controlStyles.disabled,
                state.isFocused && selectStyles.controlStyles.focus,
                classNames?.control?.(state)
            ),
        dropdownIndicator: (state) =>
            cn(
                selectStyles.dropdownIndicatorStyles,
                classNames?.dropdownIndicator?.(state)
            ),
        group: (state) => cn(classNames?.group?.(state)),
        groupHeading: (state) =>
            cn(
                selectStyles.groupHeadingStyles,
                classNames?.groupHeading?.(state)
            ),
        indicatorsContainer: (state) =>
            cn(
                selectStyles.indicatorsContainerStyles,
                classNames?.indicatorsContainer?.(state)
            ),
        indicatorSeparator: (state) =>
            cn(
                selectStyles.indicatorSeparatorStyles,
                classNames?.indicatorSeparator?.(state)
            ),
        input: (state) => cn(classNames?.input?.(state)),
        loadingIndicator: (state) =>
            cn(
                selectStyles.loadingIndicatorStyles,
                classNames?.loadingIndicator?.(state)
            ),
        loadingMessage: (state) =>
            cn(
                selectStyles.loadingMessageStyles,
                classNames?.loadingMessage?.(state)
            ),
        menu: (state) => cn(selectStyles.menu, classNames?.menu?.(state)),
        menuList: (state) => cn(classNames?.menuList?.(state)),
        menuPortal: (state) => cn(classNames?.menuPortal?.(state)),
        multiValue: (state) =>
            cn(selectStyles.multiValueStyles, classNames?.multiValue?.(state)),
        multiValueLabel: (state) => cn(classNames?.multiValueLabel?.(state)),
        multiValueRemove: (state) =>
            cn(
                selectStyles.multiValueRemove,
                classNames?.multiValueRemove?.(state)
            ),
        noOptionsMessage: (state) =>
            cn(
                selectStyles.noOptionsMessageStyles,
                classNames?.noOptionsMessage?.(state)
            ),
        option: (state) =>
            cn(
                selectStyles.optionStyles.base,
                state.isFocused && selectStyles.optionStyles.focus,
                state.isDisabled && selectStyles.optionStyles.disabled,
                state.isSelected && selectStyles.optionStyles.selected,
                classNames?.option?.(state)
            ),
        placeholder: (state) =>
            cn(
                selectStyles.placeholderStyles,
                classNames?.placeholder?.(state)
            ),
        singleValue: (state) =>
            cn(
                selectStyles.singleValueStyles,
                classNames?.singleValue?.(state)
            ),
        valueContainer: (state) =>
            cn(
                selectStyles.valueContainerStyles,
                classNames?.valueContainer?.(state)
            ),
    }
}

const defaultClassNames = createClassNames({})

const defaultStyles: StylesConfig<
    AsyncSelectOption<SelectOption>,
    boolean,
    GroupBase<AsyncSelectOption<SelectOption>>
> = {
    input: (base) => ({
        ...base,
        'input:focus': { boxShadow: 'none' },
    }),
    multiValueLabel: (base) => ({
        ...base,
        whiteSpace: 'normal',
        overflow: 'visible',
    }),
    control: (base) => ({
        ...base,
        transition: 'none',
    }),
    menuList: (base) => ({
        ...base,
        '::-webkit-scrollbar': { display: 'none', background: 'transparent' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': { background: 'hsl(var(--border))' },
        '::-webkit-scrollbar-thumb:hover': { background: 'transparent' },
    }),
}

const Option = (props: OptionProps<AsyncSelectOption<SelectOption>>) => {
    return (
        <components.Option {...props}>
            <div className="flex w-full items-center justify-between text-xs">
                <span>{props.label}</span>
                {props.isSelected && <Check className="size-3.5" />}
            </div>
        </components.Option>
    )
}

const DropdownIndicator = (
    props: DropdownIndicatorProps<AsyncSelectOption<SelectOption>>
) => {
    return (
        <components.DropdownIndicator {...props}>
            <ChevronDownIcon className="size-3.5" />
        </components.DropdownIndicator>
    )
}

const ClearIndicator = (
    props: ClearIndicatorProps<AsyncSelectOption<SelectOption>>
) => {
    return (
        <components.ClearIndicator {...props}>
            <XIcon className="size-3.5" />
        </components.ClearIndicator>
    )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
        <components.MultiValueRemove {...props}>
            <XIcon className="size-3" />
        </components.MultiValueRemove>
    )
}

export function RecipeAsyncCreatableSelect<T = string>({
    name,
    label,
    options: staticOptions,
    placeholder = 'Search or create...',
    isMulti = false,
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    loadingMessage = 'Loading options...',
    classname = defaultClassNames,
    loadOptions,
}: RecipeAsyncCreatableSelectProps<T>) {
    const { control } = useFormContext()
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Convert static options to async format if needed
    let formattedOptions: AsyncSelectOption<T>[] = []

    if (Array.isArray(staticOptions)) {
        formattedOptions = staticOptions.map((opt, index) => ({
            id: opt.id || `static-${index}`,
            value: opt.value || '',
            label: opt.label || '',
        }))
    } else if (staticOptions && typeof staticOptions === 'object') {
        // Convert object format to array of options
        formattedOptions = Object.entries(staticOptions).flatMap(
            ([key, value]) =>
                value.map((item: AsyncSelectOption<T>) => ({
                    id: item.id || key,
                    value: item.value || '',
                    label: item.label || '',
                }))
        )
    }

    const handleLoadOptions = async (searchValue: string) => {
        if (!loadOptions || isLoading) return []

        setLoading(true)
        try {
            const result = await loadOptions(searchValue)

            // If result is already an array, use it directly
            if (Array.isArray(result)) {
                return result.map((opt: AsyncSelectOption<T>) => ({
                    id: opt.id || `async-${Date.now()}-${Math.random()}`,
                    value: opt.value || '',
                    label: opt.label || '',
                }))
            }

            // If result is an object, convert to array
            if (result && typeof result === 'object') {
                return Object.entries(result).flatMap(([key, value]) =>
                    Array.isArray(value)
                        ? value.map((item: AsyncSelectOption<T>) => ({
                              id: item.id || key,
                              value: item.value || '',
                              label: item.label || '',
                          }))
                        : []
                )
            }

            return []
        } catch (error) {
            console.error('Error loading options:', error)
            return []
        } finally {
            setLoading(false)
        }
    }

    const handleCreateOption = (inputValue: string) => {
        const newOption: AsyncSelectOption<T> = {
            id: `custom-${Date.now()}`,
            value: inputValue.toLowerCase().replace(/\s+/g, '-'),
            label: inputValue.trim(),
        }

        if (isMulti) {
            control
                .unregister(name)
                .onChange([...(control.getValues()[name] || []), newOption])
        } else {
            control.unregister(name).onChange(newOption)
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    {label && (
                        <FieldLabel htmlFor={`form-${name}-label`}>
                            {label}
                        </FieldLabel>
                    )}
                    <CreatableSelect
                        {...field}
                        instanceId={`react-select-async-${name}`}
                        id={`form-${name}-select`}
                        styles={defaultStyles}
                        options={formattedOptions}
                        isMulti={isMulti}
                        isSearchable
                        isClearable={isClearable}
                        isDisabled={isDisabled}
                        placeholder={placeholder}
                        classNames={classname}
                        menuPortalTarget={mounted ? document.body : undefined}
                        menuPosition={mounted ? 'fixed' : 'absolute'}
                        maxMenuHeight={150}
                        unstyled
                        components={{
                            DropdownIndicator,
                            ClearIndicator,
                            Option,
                            MultiValueRemove,
                        }}
                        formatCreateLabel={(inputValue) =>
                            `Create "${inputValue}"`
                        }
                        getOptionValue={(option: AsyncSelectOption<T>) =>
                            option.id
                        }
                        getOptionLabel={(option: AsyncSelectOption<T>) =>
                            option.label
                        }
                        loadOptions={handleLoadOptions}
                        isLoading={isLoading || loading}
                        loadingMessage={loadingMessage}
                        cacheOptions={true}
                        defaultOptions={formattedOptions}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
