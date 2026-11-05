import { Link } from "react-router-dom";
import {
  formatProductPrice,
  getProductId,
  getProductImage,
  getProductLabel,
  getProductStock,
} from "../../utils/productHelpers";

function ProductCard({ product = {}, onDelete = () => {}, deleting = false }) {
  const productId = getProductId(product);
  const image = getProductImage(product);
  const stock = getProductStock(product);

  const name = product.name || "Untitled Product";
  const category = getProductLabel(product.category);
  const subcategory =
    product.subcategory &&
    getProductLabel(product.subcategory) !== "Uncategorized"
      ? getProductLabel(product.subcategory)
      : "";

  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discountPrice);
  const hasDiscount =
    Number.isFinite(discountPrice) &&
    discountPrice > 0 &&
    discountPrice < price;

  const displayPrice = hasDiscount ? discountPrice : price;

  const stockStatus =
    stock <= 0
      ? {
          label: "Out of stock",
          className: "bg-rose-500/10 text-rose-500",
          dot: "bg-rose-500",
        }
      : stock <= 5
        ? {
            label: "Low stock",
            className: "bg-amber-500/10 text-amber-500",
            dot: "bg-amber-500",
          }
        : {
            label: "In stock",
            className: "bg-emerald-500/10 text-emerald-500",
            dot: "bg-emerald-500",
          };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--nc-primary)/40 hover:shadow-xl">
      {/* Product image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-(--nc-hover-bg)">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-(--nc-text-secondary)">
            <div className="text-center">
              <i className="fa-regular fa-image text-4xl opacity-40" />
              <p className="mt-2 text-xs">No image available</p>
            </div>
          </div>
        )}

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />

        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-950 shadow-lg">
            <i className="fa-solid fa-star" />
            Featured
          </span>
        )}

        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            Sale
          </span>
        )}

        {/* Quick edit action */}
        {productId && (
          <Link
            to={`/products/${productId}/edit`}
            aria-label={`Edit ${name}`}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-white opacity-100 backdrop-blur-md transition hover:bg-(--nc-primary) sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          >
            <i className="fa-solid fa-pen text-sm" />
          </Link>
        )}
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-(--nc-primary)/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-(--nc-primary)">
            {category}
          </span>

          {subcategory && (
            <span className="text-[10px] text-(--nc-text-secondary)">
              / {subcategory}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-(--nc-text-primary)">
          {name}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-5 text-(--nc-text-secondary)">
          {product.shortDescription ||
            product.description ||
            "No product description available."}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-(--nc-text-secondary)">
              Price
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-xl font-extrabold text-(--nc-text-primary)">
                {formatProductPrice(displayPrice)}
              </span>

              {hasDiscount && (
                <span className="text-xs text-(--nc-text-secondary) line-through">
                  {formatProductPrice(price)}
                </span>
              )}
            </div>
          </div>

          {Number(product.averageRating ?? product.rating) > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <i className="fa-solid fa-star" />
              {Number(product.averageRating ?? product.rating).toFixed(1)}
            </div>
          )}
        </div>

        {/* Stock status */}
        <div className="mt-4 flex items-center justify-between border-t border-(--nc-border-color) pt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${stockStatus.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${stockStatus.dot}`} />
            {stockStatus.label}
          </span>

          <span className="text-xs font-semibold text-(--nc-text-secondary)">
            {stock.toLocaleString("en-US")} units
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          {productId ? (
            <Link
              to={`/products/${productId}/edit`}
              className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-(--nc-primary)/10 px-3 text-xs font-bold text-(--nc-primary) transition hover:bg-(--nc-primary) hover:text-white"
            >
              <i className="fa-solid fa-pen-to-square" />
              Edit Product
            </Link>
          ) : (
            <span className="flex min-h-10 items-center justify-center rounded-xl bg-(--nc-hover-bg) text-xs text-(--nc-text-secondary)">
              No product ID
            </span>
          )}

          <button
            type="button"
            disabled={!productId || deleting}
            onClick={() => onDelete(product)}
            aria-label={`Delete ${name}`}
            title="Delete product"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 text-rose-500 transition hover:bg-rose-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {deleting ? (
              <i className="fa-solid fa-circle-notch animate-spin" />
            ) : (
              <i className="fa-regular fa-trash-can" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
