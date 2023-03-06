export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  rating?: {
    rate?: number;
    count?: number;
  };
}

export interface Category {
  id: number,
  name: string,
  typeImg: string
}

export interface NewProduct extends Omit<Product, 'id' | 'category'>{
  categoryId: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProduct extends Partial<NewProduct>{ }
