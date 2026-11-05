function ProductPagination({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 || number === totalPages || Math.abs(number - page) <= 1,
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-4 sm:flex-row">
      <p className="text-xs text-(--nc-text-secondary)">
        Showing{" "}
        <span className="font-bold text-(--nc-text-primary)">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-bold text-(--nc-text-primary)">{totalItems}</span>{" "}
        products
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--nc-border-color) text-(--nc-text-secondary) transition hover:border-(--nc-primary) hover:text-(--nc-primary) disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>

        {pages.map((number, index) => {
          const previous = pages[index - 1];
          const showDots = previous && number - previous > 1;

          return (
            <span key={number} className="contents">
              {showDots && (
                <span className="px-1 text-(--nc-text-secondary)">...</span>
              )}

              <button
                type="button"
                onClick={() => onPageChange(number)}
                aria-current={page === number ? "page" : undefined}
                className={`h-9 min-w-9 rounded-lg px-2 text-xs font-bold transition ${
                  page === number
                    ? "bg-(--nc-primary) text-white shadow-md shadow-cyan-500/20"
                    : "border border-(--nc-border-color) text-(--nc-text-secondary) hover:border-(--nc-primary) hover:text-(--nc-primary)"
                }`}
              >
                {number}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--nc-border-color) text-(--nc-text-secondary) transition hover:border-(--nc-primary) hover:text-(--nc-primary) disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>
    </div>
  );
}

export default ProductPagination;
