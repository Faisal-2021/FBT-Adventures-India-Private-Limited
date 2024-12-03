"use client";
import { useCartStore } from "@/zustand/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  // Function to calculate the total number of items in the cart
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">Product Store</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="/cart" className="flex items-center">
            {/* Shopping cart icon */}
            Cart
            <ShoppingCart className="h-4 w-4 mr-1" />
            {/* Number of items in the cart */}
            {totalItems > 0 && (
              <span className="ml-1 bg-white text-blue-500 rounded-full px-2 py-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
