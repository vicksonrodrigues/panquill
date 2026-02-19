import { NavMainProps } from "@/types/appBar";
import { Book, ChefHat, Heart, House, List, PlusIcon } from "lucide-react";

export const navigationData: NavMainProps[] = [
  {
    title: "Home",
    url: "/",
    icon: House,
    private: false,
  },
  {
    title: "CookBook",
    url: "/cookbook",
    icon: Book,
    private: false,
  },
  {
    title: "Favourites",
    url: "/favourites",
    icon: Heart,
    private: true,
  },
  {
    title: "My Creations",
    url: "/myCreations",
    icon: ChefHat,
    private: true,
    items: [
      {
        title: "New Recipe",
        url: "/myCreations/new",
        icon: PlusIcon,
      },
    ],
  },
];

export const siteName = "Panquill";

export const siteLogoUrl = "/Logo/Panquill-LogoOnly.png";

export const dummyRecipeImageUrl =
  "https://res.cloudinary.com/panquill-image-store/image/upload/v1770280543/dummy_recipe__image_r0ixwz.png";
