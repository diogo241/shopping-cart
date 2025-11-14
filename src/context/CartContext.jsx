import { useState, createContext, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      return JSON.parse(storedItems);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      //Com o prev verificamos se o produto já existe no carrinho
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        //Aqui retornamos o product e adicionamos qty 1 se já existir
        return prev.map((item) =>
          item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item
        );
      }

      return [...prev, { ...product, cartQty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      //Remove items
      const items = prev.filter((item) => item.id !== id);
      return items;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook e product context
export function useCart() {
  return useContext(CartContext);
}
