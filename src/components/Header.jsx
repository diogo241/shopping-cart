import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [showDropdown, setDropdown] = useState(false);

  const { cart, removeFromCart, clearCart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.cartQty, 0);
  const itemTotal = cart
    .reduce((acc, item) => acc + item.price * item.cartQty, 0)
    .toFixed(2);
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed flex w-full z-30">
      <h1 className="text-2xl font-bold text-blue-600">Shop</h1>

      <div className="relative">
        <button
          className="cursor-pointer"
          onClick={() => setDropdown(!showDropdown)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex flex-items items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-white border-1 border-gray-100 rounded shadow-sm z-50 p-2">
            {cart.length === 0 ? (
              <p className="text-gray-500 tetx-sm">Cart is empty</p>
            ) : (
              <>
                <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex w-30">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20"
                        />
                      </div>
                      <div className="flex flex-col items-start grow">
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="font-semibold text-gray-800">
                          {item.cartQty} x {item.price}€
                        </p>
                        <button
                          className="cursor-pointer text-sm text-red-500 hover:underline font-semibold"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{itemTotal}€</span>
                </div>
                <div className="mt-4 flex justify-between font-semibold">
                  <button
                    className="cursor-pointer text-sm bg-red-500 py-2 hover:no-underline w-full rounded  text-white font-semibold"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
