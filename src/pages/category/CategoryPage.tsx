import { useEffect, useState } from "react";

import type { Category } from "../../models/Category";

import {
  getAllCategories
}
from "../../services/categoryService";

export default function CategoryPage() {

  const [categories,
    setCategories] =
    useState<Category[]>([]);

  const loadData =
    async () => {

      const data =
        await getAllCategories();

      setCategories(data);
    };

  useEffect(() => {
    loadData();
  }, []);

  return (

    <div>

      <h1>Categories</h1>

      {categories.map(category => (

        <div key={category.key}>

          <h3>
            {category.name}
          </h3>

          <p>
            {category.defaultQuantity}
          </p>

        </div>

      ))}

    </div>
  );
}