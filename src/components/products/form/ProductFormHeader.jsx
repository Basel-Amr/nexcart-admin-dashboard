import { Link } from "react-router-dom";

function ProductFormHeader({ mode = "add", productName = "" }) {
  const isEdit = mode === "edit";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-(--nc-primary)/10 blur-3xl" />

      <div className="relative">
        <Link
          to="/products"
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-(--nc-text-secondary) transition hover:text-(--nc-primary)"
        >
          <i className="fa-solid fa-arrow-left" />
          Back to Products
        </Link>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--nc-primary)">
              <i
                className={
                  isEdit
                    ? "fa-solid fa-pen-to-square"
                    : "fa-solid fa-wand-magic-sparkles"
                }
              />
              {isEdit ? "Catalog Management / Edit" : "Catalog Management"}
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-(--nc-text-primary) sm:text-3xl">
              {isEdit ? "Edit Product" : "Create New Product"}
              <span className="ml-2 text-(--nc-primary)">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-(--nc-text-secondary)">
              {isEdit
                ? `Update the details${productName ? ` for ${productName}` : ""} and keep your catalog accurate.`
                : "Add a new item to your catalog with detailed information, pricing, images, and inventory."}
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-(--nc-border-color) bg-(--nc-hover-bg) px-4 py-3 text-xs text-(--nc-text-secondary)">
            <i className="fa-solid fa-shield-halved text-(--nc-primary)" />
            Secure product management
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductFormHeader;
