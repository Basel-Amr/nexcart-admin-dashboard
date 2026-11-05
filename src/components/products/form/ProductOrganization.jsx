const inputClass =
  "w-full rounded-xl border border-(--nc-border-color) bg-(--nc-input-bg) px-4 py-3 text-sm text-(--nc-input-text) outline-none transition placeholder:text-(--nc-input-placeholder) focus:border-(--nc-primary) focus:ring-2 focus:ring-(--nc-primary)/10";

function ProductOrganization({ form, onChange, errors = {} }) {
  const fields = [
    {
      name: "category",
      label: "Category",
      placeholder: "e.g. Electronics",
      required: true,
    },
    {
      name: "subcategory",
      label: "Subcategory",
      placeholder: "e.g. Headphones",
    },
    {
      name: "brand",
      label: "Brand",
      placeholder: "e.g. Sony",
    },
    {
      name: "sku",
      label: "SKU",
      placeholder: "e.g. NC-HEAD-001",
    },
  ];

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-layer-group" />
        </div>
        <div>
          <h2 className="text-base font-bold text-(--nc-text-primary)">
            Product Organization
          </h2>
          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Organize your product so customers can find it easily.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
              {field.label}
              {field.required && <span className="ml-1 text-rose-500">*</span>}
            </label>

            <input
              name={field.name}
              value={form[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
              className={inputClass}
            />

            {errors[field.name] && (
              <p className="mt-1 text-xs text-rose-500">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-(--nc-text-primary)">
            Tags
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={onChange}
            placeholder="wireless, premium, audio"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-(--nc-text-secondary)">
            Separate tags with commas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductOrganization;
