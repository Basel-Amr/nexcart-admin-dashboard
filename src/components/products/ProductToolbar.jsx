function ProductToolbar({
  search = "",
  category = "",
  subcategory = "",
  sort = "newest",
  categories = [],
  subcategories = [],
  onSearchChange = () => {},
  onCategoryChange = () => {},
  onSubcategoryChange = () => {},
  onSortChange = () => {},
  onReset = () => {},
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeSubcategories = Array.isArray(subcategories) ? subcategories : [];

  const hasFilters =
    Boolean(search || category || subcategory) || sort !== "newest";

  const selectClass =
    "h-11 w-full rounded-xl border border-(--nc-border-color) bg-(--nc-input-bg) px-3 text-sm text-(--nc-input-text) outline-none transition focus:border-(--nc-primary) focus:ring-2 focus:ring-(--nc-primary)/10";

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-4 shadow-sm transition-colors duration-200 sm:p-5">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-(--nc-text-primary)">
            Find Products
          </h3>

          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Search, filter, and organize your inventory.
          </p>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="w-fit text-xs font-semibold text-(--nc-primary) transition hover:opacity-75"
          >
            <i className="fa-solid fa-rotate-left mr-1.5" />
            Clear filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Search */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-(--nc-text-secondary)" />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products, brands, SKU..."
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-(--nc-border-color) bg-(--nc-input-bg) pl-11 pr-4 text-sm text-(--nc-input-text) outline-none transition placeholder:text-(--nc-input-placeholder) focus:border-(--nc-primary) focus:ring-2 focus:ring-(--nc-primary)/10"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>

          {safeCategories.map((item, index) => (
            <option key={`${item}-${index}`} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        <select
          value={subcategory}
          onChange={(event) => onSubcategoryChange(event.target.value)}
          disabled={!category || safeSubcategories.length === 0}
          className={`${selectClass} disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label="Filter by subcategory"
        >
          <option value="">All Subcategories</option>

          {safeSubcategories.map((item, index) => (
            <option key={`${item}-${index}`} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className={selectClass}
          aria-label="Sort products"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </section>
  );
}

export default ProductToolbar;
