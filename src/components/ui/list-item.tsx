"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface ListItemProps {
  category: any;
  onSelect: (category: any) => void;
  isChecked: boolean;
}

export const ListItem = ({ category, onSelect, isChecked }: ListItemProps) => {
  return (
    <div
      className="flex items-center px-4 py-1 cursor-pointer hover:bg-gray-50 text-muted-foreground hover:text-primary"
      onClick={() => onSelect(category)}
    >
      <p className={cn("w-full truncate text-sm whitespace-nowrap", isChecked ? "text-red-900 font-semibold" : "text-black")}>
        {category.label}
      </p>
      <Check
        className={cn(
          "ml-auto h-4 w-4",
          isChecked ? "opacity-100 text-red-800 font-bold" : "opacity-0"
        )}
      />
    </div>
  );
};