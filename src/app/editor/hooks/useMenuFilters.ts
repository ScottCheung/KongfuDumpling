/** @format */

import { MenuItem } from '@/types/menu';

export function useMenuFilters(
  items: (MenuItem & { category?: string })[],
  searchTerm: string,
  selectedCategory: string,
  selectedTags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  },
) {
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    // 检查标签匹配
    const itemTags = item.tags || {
      ingredients: [],
      flavors: [],
      restrictions: [],
    };

    const matchesTags =
      (selectedTags.ingredients.length === 0 ||
        selectedTags.ingredients.every((tag) =>
          itemTags.ingredients?.includes(tag),
        )) &&
      (selectedTags.flavors.length === 0 ||
        selectedTags.flavors.every((tag) => itemTags.flavors?.includes(tag))) &&
      (selectedTags.restrictions.length === 0 ||
        selectedTags.restrictions.every((tag) =>
          itemTags.restrictions?.includes(tag),
        ));

    return matchesSearch && matchesCategory && matchesTags;
  });

  return filteredItems;
}
