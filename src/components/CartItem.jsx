// This is the cart item component that displays the product details and allows the user to update the quantity and remove the product from the cart
// Child of Cart page

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

export default function CartItem({ item, removeItem, updateQuantity }) {
  return (
    <div key={item.id} className="flex items-center border-b py-4">
      {/* Image of the product */}
      <Image
        src={item.image}
        alt={item.title}
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="ml-4 flex-grow">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          {/* Minus button used to decrease the quantity of the product */}
          <button
            onClick={() => {
              updateQuantity(item.id, item.quantity - 1);
              toast.success(
                `You've changed ${item.title} Quantity to ${item.quantity - 1}`
              );
            }}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="mx-2 w-8 text-center">{item.quantity}</span>
          
          {/* Plus button used to increase the quantity of the product */}
          <button
            onClick={() => {
              updateQuantity(item.id, item.quantity + 1);
              toast.success(
                `You've changed ${item.title} Quantity to ${item.quantity + 1}`
              );
            }}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          removeItem(item.id);
          toast.success(`${item.title} removed from cart`);
        }}
        className="p-2 text-red-500 hover:text-red-700"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
