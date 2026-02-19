"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
/* eslint-disable @next/next/no-img-element */
import { AlignLeft, Eye, Heart, Lightbulb, Timer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const sampleRecipe = {
  title: "Creamy Garlic Pasta",
  description:
    "A rich and creamy garlic-flavored pasta made with simple ingredients, perfect for a quick and comforting meal.",
  prepTime: "10 minutes",
  cookTime: "20 minutes",
  serve: "2 people",
  saved: 150,
  views: 1200,
  ingredients: [
    {
      name: "Pasta (penne or spaghetti)",
      quantity: "200 g",
    },
    {
      name: "Garlic cloves",
      quantity: "6, finely chopped",
    },
    {
      name: "Butter",
      quantity: "2 tbsp",
    },
    {
      name: "Olive oil",
      quantity: "1 tbsp",
    },
    {
      name: "Fresh cream",
      quantity: "1 cup",
    },
    {
      name: "Milk",
      quantity: "1/2 cup",
    },
    {
      name: "Parmesan cheese",
      quantity: "1/2 cup, grated",
    },
    {
      name: "Black pepper",
      quantity: "1/2 tsp",
    },
    {
      name: "Chili flakes",
      quantity: "1/2 tsp",
    },
    {
      name: "Salt",
      quantity: "to taste",
    },
    {
      name: "Fresh parsley",
      quantity: "2 tbsp, chopped",
    },
  ],
  toolsRequired: [
    "Large pot",
    "Frying pan",
    "Wooden spoon",
    "Strainer",
    "Measuring cups",
  ],
  steps: [
    "Boil water in a large pot, add salt, and cook the pasta according to package instructions. Drain and set aside.",
    "Heat butter and olive oil in a frying pan over medium heat.",
    "Add chopped garlic and sauté until fragrant but not browned.",
    "Pour in the cream and milk, stirring continuously to combine.",
    "Add black pepper, chili flakes, and salt. Let the sauce simmer for 3–4 minutes.",
    "Add cooked pasta to the sauce and toss until well coated.",
    "Mix in grated Parmesan cheese and cook for another 1–2 minutes.",
    "Turn off the heat and garnish with fresh parsley before serving.",
  ],
  tipsAndTricks: [
    "Reserve some pasta water to adjust the sauce consistency if it becomes too thick.",
    "Use freshly grated cheese for a smoother and richer sauce.",
    "Add mushrooms or grilled chicken for extra flavor and protein.",
    "Cook garlic on low heat to avoid bitterness.",
  ],
};

export default function RecipePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <section className="py-15">
      <div className="@container/main">
        <div className="relative grid-cols-3 gap-20 lg:grid">
          <div className="lg:col-span-2">
            <section
              id="section1"
              ref={(ref) => addSectionRef("section1", ref)}
              className="prose dark:prose-invert mb-8 scroll-mt-24"
            >
              <div>
                <h1 className="mt-3 text-3xl font-extrabold">
                  {sampleRecipe.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  {sampleRecipe.description}
                </p>

                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="my-8 aspect-video w-full rounded-md object-cover"
                />
              </div>

              <ul>
                <li>
                  Preparation Time:{" "}
                  <Badge className="bg-violet-500 dark:bg-violet-200 gap-2">
                    {sampleRecipe.prepTime}
                    <Timer />
                  </Badge>
                </li>
                <li>
                  Cooking Time:{" "}
                  <Badge className="bg-violet-500 dark:bg-violet-200 gap-2">
                    {sampleRecipe.cookTime}
                    <Timer />
                  </Badge>
                </li>
              </ul>
            </section>
            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose dark:prose-invert mb-8 scroll-mt-24"
            >
              <h2>Ingredients</h2>

              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Item Name </th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRecipe.ingredients.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={"even:bg-muted border-t p-2"}
                        >
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <h3> Tools Required</h3>
              <ul>
                {sampleRecipe.toolsRequired.map((tool, index) => {
                  return <li key={index}>{tool}</li>;
                })}
              </ul>
            </section>
            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose dark:prose-invert mb-8 scroll-mt-24"
            >
              <h2>Preparation Steps</h2>
              <div className="ml-3.5">
                {sampleRecipe.steps.map((step, index) => {
                  return (
                    <div className="relative flex items-start pb-1" key={index}>
                      <div className="bg-border/70 absolute top-[2.75rem] h-[calc(100%-2.75rem)] w-px"></div>
                      <div className="absolute ml-[-14px] py-2">
                        <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-lg">
                          {index + 1}
                        </div>
                      </div>
                      <div className="pl-12">
                        <h3 className="mt-2 text-base font-semibold">
                          Step {index + 1}
                        </h3>
                        <p>{step}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="prose dark:prose-invert mb-8 scroll-mt-24">
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tips & Trick!</AlertTitle>
                <AlertDescription>
                  <ul>
                    {sampleRecipe.tipsAndTricks.map((tip, index) => {
                      return <li key={index}>{tip}</li>;
                    })}
                  </ul>
                </AlertDescription>
              </Alert>
            </section>
          </div>
          <div className="sticky top-20 hidden h-fit lg:block">
            <span className="flex items-center gap-2 text-sm">
              <AlignLeft className="h-4 w-4" />
              On this page
            </span>
            <nav className="mt-2 text-sm">
              <ul>
                <li>
                  <a
                    href="#section1"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section1"
                        ? "text-secondary font-bold"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section2"
                        ? "text-secondary font-bold"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Ingredients
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section3"
                        ? "text-secondary font-bold"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Preparation Steps
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
