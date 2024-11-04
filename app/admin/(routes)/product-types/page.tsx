import { getProductTypes } from "@/data/product-type";
import Client from "./_components/client";

async function ProductTypes() {
  const data = await getProductTypes();
  const initialData = JSON.parse(data);
  return <Client initialData={initialData} />;
}

export default ProductTypes;
