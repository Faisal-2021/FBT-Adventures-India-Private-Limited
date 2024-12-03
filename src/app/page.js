import ProductCard from "@/components/ProductCard";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  let products = [];
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-2 p-10">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      <Toaster />
    </div>
  );
}
