export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export type ProductsResponse = {
  currentPage: Product[];
  totalPages: number;
};

export type QueryType = {
  search: string | null;
  category: string | null;
  price: string | null;
  page: number | null;
  string: string | null;
};
