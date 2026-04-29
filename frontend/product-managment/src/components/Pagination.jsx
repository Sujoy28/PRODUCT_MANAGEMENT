export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-2 mt-6">

      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-1 border rounded"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>

    </div>
  );
}