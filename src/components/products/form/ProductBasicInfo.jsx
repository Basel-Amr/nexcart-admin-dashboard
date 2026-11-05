const inputClass =
  "w-full rounded-xl border border-(--nc-border-color) bg-(--nc-input-bg) px-4 py-3 text-sm text-(--nc-input-text) outline-none transition placeholder:text-(--nc-input-placeholder) focus:border-(--nc-primary) focus:ring-2 focus:ring-(--nc-primary)/10";

function ProductBasicInfo({ form, onChange, errors = {} }) {
  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-circle-info" />
        </div>
        <div>
          <h2 className="text-base font-bold text-(--nc-text-primary)">
            Basic Information
          </h2>
          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Give your product a clear name and detailed description.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            maxLength={120}
            placeholder="e.g. Premium Wireless Headphones"
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Short Description <span className="text-rose-500">*</span>
          </label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={onChange}
            maxLength={200}
            placeholder="A concise summary of your product..."
            className={inputClass}
          />
          {errors.shortDescription && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.shortDescription}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={6}
            placeholder="Describe the product's features, benefits, and important details..."
            className={`${inputClass} min-h-36 resize-y leading-6`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-500">{errors.description}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductBasicInfo;
