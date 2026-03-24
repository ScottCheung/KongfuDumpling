export interface MenuTags {
  ingredients: string[];
  flavors: string[];
  restrictions: string[];
}

export interface MenuOption {
  name: string;
  price?: number;
  tags?: MenuTags;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  options?: MenuOption[];
  image?: string;
  tags?: MenuTags;
  category?: string;
  isModified?: boolean;
  modifiedFields?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  isModified?: boolean;
  modifiedFields?: string[];
}

export interface MenuData {
  categories: MenuCategory[];
  lastModified?: string;
}

export interface ModificationHistory {
  itemId: string;
  field: string;
  oldValue: string | number;
  newValue: string | number;
  timestamp: string;
}
