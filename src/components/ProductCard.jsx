import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rouded-lg shadow p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 object-contain rounded mb-4"
      />
      <h2 className="text-xl font-semibold text-black">{product.name}</h2>
      <p className="text-sm text-gray-500 my-2">{product.description}</p>
      <p className="font-bold text-sm">{product.price.toFixed(2)}€</p>

      <button
        onClick={() => addToCart(product)}
        className="cursor-pointer bg-blue-600 text-white mt-3 px-4 py-2 rounded transition hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
