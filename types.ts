import { Product, ProductType } from "@prisma/client";

export type ExtendedProductType = ProductType & {
  products: Product[];
};

export type ExtendedProduct = Product & {
  price: number;
  productType: ExtendedProductType;
};
