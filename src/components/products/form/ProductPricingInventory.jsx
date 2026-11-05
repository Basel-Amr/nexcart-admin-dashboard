const inputClass =
  "w-full rounded-xl border border-(--nc-border-color) bg-(--nc-input-bg) px-4 py-3 text-sm text-(--nc-input-text) outline-none transition placeholder:text-(--nc-input-placeholder) focus:border-(--nc-primary) focus:ring-2 focus:ring-(--nc-primary)/10";

function ProductPricingInventory({ form, onChange, errors = {} }) {
  const discount =
    form.price &&
    form.discountPrice &&
    Number(form.discountPrice) < Number(form.price)
      ? Math.round(
          ((Number(form.price) - Number(form.discountPrice)) /
            Number(form.price)) *
            100,
        )
      : 0;

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-tags" />
        </div>
        <div>
          <h2 className="text-base font-bold text-(--nc-text-primary)">
            Pricing & Inventory
          </h2>
          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Set your product price and available stock.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Regular Price <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-(--nc-text-secondary)">
              $
            </span>
            <input
              type="number"
              name="price"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={onChange}
              placeholder="0.00"
              className={`${inputClass} pl-9`}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-xs text-rose-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Discount Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-(--nc-text-secondary)">
              $
            </span>
            <input
              type="number"
              name="discountPrice"
              min="0.01"
              step="0.01"
              value={form.discountPrice}
              onChange={onChange}
              placeholder="0.00"
              className={`${inputClass} pl-9`}
            />
          </div>
          {errors.discountPrice && (
            <p className="mt-1 text-xs text-rose-500">{errors.discountPrice}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Available Stock <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            step="1"
            value={form.stock}
            onChange={onChange}
            placeholder="e.g. 100"
            className={inputClass}
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-rose-500">{errors.stock}</p>
          )}
        </div>
      </div>

      {discount > 0 && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
            <i className="fa-solid fa-percent" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-500">
              {discount}% discount
            </p>
            <p className="mt-0.5 text-xs text-(--nc-text-secondary)">
              Customers save {discount}% on this product.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductPricingInventory;
