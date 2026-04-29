import { useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return <div className="h-40 bg-gray-200" />;

  return (
    <div className="relative">
      <img
        src={images[index]}
        className="h-40 w-full object-cover rounded"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setIndex((index - 1 + images.length) % images.length)
            }
            className="absolute left-1 top-1/2 bg-black/50 text-white px-2"
          >
            PERVIOUS
          </button>

          <button
            onClick={() => setIndex((index + 1) % images.length)}
            className="absolute right-1 top-1/2 bg-black/50 text-white px-2"
          >
            NEXT
          </button>
        </>
      )}
    </div>
  );
}