function ProductPreview({ form, image }) {
  const hasDiscount =
    form.price &&
    form.discountPrice &&
    Number(form.discountPrice) < Number(form.price);

  return (
    <section className="overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm">
      <div className="border-b border-(--nc-border-color) p-5">
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-eye text-(--nc-primary)" />
          <h3 className="text-sm font-bold text-(--nc-text-primary)">
            Product Preview
          </h3>
        </div>
        <p className="mt-1 text-xs text-(--nc-text-secondary)">
          A live preview of your product information.
        </p>
      </div>

      <div className="p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-(--nc-hover-bg)">
          {image ? (
            <img
              src={image}
              alt="Product preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-(--nc-text-secondary)">
              <i className="fa-regular fa-image text-4xl opacity-40" />
              <span className="mt-2 text-xs">Image preview</span>
            </div>
          )}

          {form.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-slate-950">
              <i className="fa-solid fa-star mr-1" />
              Featured
            </span>
          )}
        </div>

        <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-(--nc-primary)">
          {form.category || "Product Category"}
        </p>

        <h4 className="mt-1 line-clamp-2 text-base font-bold text-(--nc-text-primary)">
          {form.name || "Your Product Name"}
        </h4>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-(--nc-text-secondary)">
          {form.shortDescription ||
            "Your short product description appears here."}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-(--nc-border-color) pt-4">
          <div>
            <p className="text-lg font-extrabold text-(--nc-text-primary)">
              {form.discountPrice
                ? `$${Number(form.discountPrice).toFixed(2)}`
                : form.price
                  ? `$${Number(form.price).toFixed(2)}`
                  : "$0.00"}
            </p>

            {hasDiscount && (
              <p className="text-xs text-(--nc-text-secondary) line-through">
                ${Number(form.price).toFixed(2)}
              </p>
            )}
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              form.isActive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-slate-500/10 text-slate-500"
            }`}
          >
            {form.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProductPreview;
