import ImageSlider from "./ImageSlider";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white">
      <ImageSlider images={product.images} />

      <h2 className="font-semibold text-lg mt-2">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>

      <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

      <p className="text-xs text-gray-500 mt-1">
        {product.category?.name} → {product.subcategory?.name}
      </p>
    </div>
  );
}