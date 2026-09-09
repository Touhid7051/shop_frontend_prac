import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productsApi";

const ProductListPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(search, ordering).then((data) => setProducts(data));
  }, [search, ordering]);

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      <div className="mb-4 flex gap-2">
        <input
          className="border p-2"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="border p-2"
          value={ordering}
          onChange={(event) => setOrdering(event.target.value)}
        >
          <option value="-created_at"> Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
        <button
          className="ml-2 mt-2 bg-gray-700 p-2 text-white"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div className="border p-3" key={product.id}>
            {product.image ? (
              <img
                className="h-40 w-full object-cover"
                src={product.image}
                alt={product.name}
              />
            ) : (
              <div className="flex h-40 items-center justify-center bg-gray-200">
                No Image
              </div>
            )}
            <h2 className="mt-2 font-bold">{product.name}</h2>
            <p>{product.category_name}</p>
            <p>${product.price}</p>
            <button
              className="mt-2 bg-blue-600 p-2 text-white"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              View Details
            </button>
            <button
              className="mt-2 bg-green-600 p-2 text-white"
              onClick={() => addToCart(product) }
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductListPage;
