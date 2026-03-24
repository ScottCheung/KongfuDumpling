export interface MenuOption {
  name: string;
  price: number;
  tags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  options: MenuOption[];
  tags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}
