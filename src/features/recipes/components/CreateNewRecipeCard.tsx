"use client";

import React, { useState } from "react";
import { RecipeForm } from "./RecipeForm";
import RecipePreview from "./RecipePreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EyeIcon, Form } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { recipeSchema } from "../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type ToogleStateType = "Form" | "Preview";

export default function CreateNewRecipeCard() {
  const [toggle, setToogle] = useState<ToogleStateType>("Form");

  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      imgUrl: "",
      course: {
        id: "1",
        name: "Dinner",
      },
      cuisine: [],
      tags: [],
      prepTime: 0,
      cookTime: 0,
      serving: 1,
      tools: [],
      ingredients: [],
      steps: [],
      tips: [],
      isPublished: false,
      isAdminRecipe: false,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof recipeSchema>> = (data) => {
    console.log("Submit Data", data);
  };
  return (
    <div className=" w-full flex flex-col space-y-2">
      <ToggleGroup
        type="single"
        value={toggle}
        onValueChange={(value: ToogleStateType) => setToogle(value)}
        variant="outline"
        spacing={2}
        size="lg"
      >
        <ToggleGroupItem value="Form" aria-label="Toggle Form">
          <Form />
          Form
        </ToggleGroupItem>
        <ToggleGroupItem value="Preview" aria-label="Toggle Preview">
          <EyeIcon />
          Preview
        </ToggleGroupItem>
      </ToggleGroup>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Recipe {toggle}</CardTitle>
        </CardHeader>
        <CardContent>
          {toggle === "Form" ? (
            <RecipeForm form={form} onSubmit={onSubmit} />
          ) : (
            <RecipePreview />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
