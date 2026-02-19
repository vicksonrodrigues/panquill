"use client";

import React, { useEffect, useState } from "react";

export default function RecipeImagePicker() {
  const [file, setFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);

  function onSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={onSelectImage} />

      {preview && (
        <img
          src={preview}
          alt="Recipe preview"
          className=" w-full object-cover rounded-md border"
        />
      )}
    </div>
  );
}
