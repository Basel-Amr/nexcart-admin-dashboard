import ProductCard from "./ProductCard";

function ProductGrid({ products = [], onDelete = () => {} }) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-(--nc-border-color) bg-(--nc-surface) px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-box-open text-2xl" />
        </div>

        <h3 className="mt-5 text-lg font-bold text-(--nc-text-primary)">
          No products found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-(--nc-text-secondary)">
          We couldn't find products matching your search or filters. Try
          changing your filters or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {safeProducts.map((product, index) => (
        <div
          key={product?._id || product?.id || product?.productId || index}
          className="animate-[fadeIn_0.35s_ease-out_both]"
          style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
        >
          <ProductCard product={product} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
