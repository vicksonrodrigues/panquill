import { LucideIcon } from "lucide-react";

export interface NavMainProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  private: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export interface NavUserProps {
  name: string;
  email: string;
  avatar: string;
}
