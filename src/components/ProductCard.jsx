// This is the product card component that displays the product details and allows the user to add the product to the cart

"use client"
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/zustand/cart";
import toast from "react-hot-toast";

export default function ProductCard({
  title,
  price,
  description,
  category,
  image,
  rating,
  id
}) {

  const { addItem } = useCartStore()

  // Function to add the product to the cart
  const handleAddToCart = () => {
    addItem({ id, title, price, image, quantity: 1 }) //zustand store function to add item to cart
    toast.success(`${title} added to cart`)
  }

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow duration-500 cursor-pointer">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-gray-700 text-sm font-medium mr-1">
            {rating.rate}
          </span>
          <span className="text-gray-500 text-xs">({rating.count})</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-900 font-bold text-lg">
            ${price.toFixed(2)}
          </span>
          <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded-full inline-flex items-center transition-colors duration-300">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
