import { useEffect, useState } from "react";
import { getProducts, getCategories, getSubcategories } from "../api/api";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load categories
  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (category) {
      getSubcategories(category).then(res => setSubcategories(res.data));
    } else {
      setSubcategories([]);
    }
  }, [category]);

  // Load products
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, subcategory, page]);

  const fetchProducts = async () => {
    const res = await getProducts({
      search: debouncedSearch,
      category,
      subcategory,
      page,
      limit: 10
    });

    setProducts(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="p-4 md:p-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Filters */}
      <Filters
        categories={categories}
        subcategories={subcategories}
        selectedCategory={category}
        selectedSubcategory={subcategory}
        setCategory={setCategory}
        setSubcategory={setSubcategory}
      />

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No Products Found
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}