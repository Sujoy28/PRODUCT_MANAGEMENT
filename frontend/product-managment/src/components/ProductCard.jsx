import { useState } from "react";

export default function ProductCard({ product }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white">

      {/* Image Slider */}
      {product.images?.length > 0 && (
        <div className="relative mb-3">
          <img
            src={product.images[index]}
            alt="product"
            className="w-full h-48 object-cover rounded"
          />

          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 rounded"
              >
                PERVIOUS
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 rounded"
              >
                NEXT
              </button>
            </>
          )}
        </div>
      )}

      <h2 className="font-semibold text-lg">{product.name}</h2>

      <p className="text-sm text-gray-600 mt-1">
        {product.description}
      </p>

      <p className="text-green-600 font-bold mt-2">
        ₹{product.price}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {product.category?.name} → {product.subcategory?.name}
      </p>

    </div>
  );
}