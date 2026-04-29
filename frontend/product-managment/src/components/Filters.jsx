export default function Filters({
  categories,
  subcategories,
  selectedCategory,
  selectedSubcategory,
  setCategory,
  setSubcategory
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">

      
      <select
        className="border p-2 rounded w-full md:w-1/3"
        value={selectedCategory}
        onChange={(e) => {
          setCategory(e.target.value);
          setSubcategory(""); // reset subcategory
        }}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

     
      <select
        className="border p-2 rounded w-full md:w-1/3"
        value={selectedSubcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        disabled={!selectedCategory}
      >
        <option value="">All Subcategories</option>
        {subcategories.map(sc => (
          <option key={sc._id} value={sc._id}>{sc.name}</option>
        ))}
      </select>
    </div>
  );
}