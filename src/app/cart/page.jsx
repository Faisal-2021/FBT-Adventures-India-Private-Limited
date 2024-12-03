"use client";

import { useState } from "react";
import { useCartStore, Discount } from "@/zustand/cart";
import CartItem from "@/components/CartItem";
import toast, { Toaster } from "react-hot-toast";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    discount,
    applyDiscount,
    removeDiscount,
  } = useCartStore(); //  the cart store functions to manage the cart
  const [discountValue, setDiscountValue] = useState("");

  // Function to calculate the subtotal of the cart
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Function to calculate the discount amount of the cart
  const discountAmount = discount
    ? discount.type === "fixed"
      ? discount.value
      : (subtotal * discount.value) / 100
    : 0;

  // Function to calculate the total of the cart
  const total = Math.max(0, subtotal - discountAmount);

  // Function to apply the discount to the cart
  const handleApplyDiscount = () => {
    const value = parseFloat(discountValue);
    if (!isNaN(value) && value > 0) {
      applyDiscount({ type: "fixed", value });
    }
    toast.success(`${value} discount applied`)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} removeItem={removeItem} updateQuantity={updateQuantity} />
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Apply Discount</h2>
            <div className="grid grid-cols-4 gap-4">
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full p-2 rounded-md outline-none border-none col-span-3 "
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-sky-500 hover:bg-sky-600 py-2 rounded-md text-white tracking-wider"
              >
                Apply
              </button>
            </div>
            {discount && (
              <div className="mt-2">
                <p className="text-green-600">
                  Discount applied
                  {discount.value}
                </p>
                <button
                  onClick={removeDiscount}
                  className="mt-1  text-red-500 bg-red-100 p-2 rounded-md hover:bg-red-200"
                >
                  Remove Discount
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-sky-500 hover:bg-sky-600 py-2 rounded-lg text-white tracking-wider">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
