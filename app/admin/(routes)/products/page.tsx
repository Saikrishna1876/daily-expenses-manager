import { getProducts } from "@/data/product";
import Client from "./_components/client";

async function Products() {
  const data = await getProducts();
  const initialData = JSON.parse(data);
  return <Client initialData={initialData} />;
}

export default Products;
