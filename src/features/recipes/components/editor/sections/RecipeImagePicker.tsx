'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

type RecipeImagePickerProps = {
    name: string
    label: string
    inputProps?: Omit<
        ComponentPropsWithoutRef<typeof Input>,
        'id' | 'aria-invalid' | 'type' | 'accept'
    >
}

export default function RecipeImagePicker({
    name,
    label,
    inputProps,
}: RecipeImagePickerProps) {
    const { control, setValue } = useFormContext()
    const objectUrlRef = useRef<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Cleanup on unmount
    const previewUrl = useWatch({ control, name: 'imgPreviewUrl' })

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current)
            }
        }
    }, [])

    function handleImageChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setValue: (name: string, value: any) => void,
        objectUrlRef: { current: string | null }
    ) {
        const file = e.target.files?.[0]
        if (!file) return

        // Cleanup previous blob URL
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current)
        }

        // Convert to base64 for persistent preview
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            setValue('imgPreviewUrl', {
                name: file.name,
                base64String: base64String,
            })
        }
        reader.readAsDataURL(file)

        // Store File object for upload
        // setValue("imgUrl", file);
    }

    return (
        <div className="space-y-2">
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                    return (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={`form-${name}-label`}>
                                {label}
                            </FieldLabel>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageChange(e, setValue, objectUrlRef)
                                }
                                className="hidden"
                                id={`form-${name}-input`}
                            />

                            {/* Custom UI */}
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="shrink-0"
                                >
                                    Choose File
                                </Button>
                                <Input
                                    type="text"
                                    value={previewUrl?.name || 'No file chosen'}
                                    readOnly
                                    className="text-muted-foreground italic"
                                    tabIndex={-1}
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )
                }}
            />

            {/* Preview persists because it reads from RHF state */}
            {previewUrl && (
                <img
                    src={previewUrl.base64String}
                    alt="Recipe preview"
                    className="w-full rounded-md border object-cover"
                />
            )}
        </div>
    )
}

/*  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]); */
