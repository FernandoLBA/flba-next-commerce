"use client";

import { createContext, ReactNode, useContext } from "react";
import { Category } from "../types/category.type";

const CategoriesContext = createContext<Category[]>([]);

type CategoriesProviderProps = {
  categories: Category[];
  children: ReactNode;
};

export const CategoriesProvider = ({
  categories,
  children,
}: CategoriesProviderProps) => (
  <CategoriesContext value={categories}>{children}</CategoriesContext>
);

export const useCategories = () => useContext(CategoriesContext);
