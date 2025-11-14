import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';
import Spinner from './Spinner';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  return (
    <>
      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
