function ProductSettings({ form, onChange }) {
  const settings = [
    {
      name: "isActive",
      title: "Active Product",
      description: "Available in your store",
    },
    {
      name: "featured",
      title: "Featured Product",
      description: "Highlight this product",
    },
  ];

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-sliders" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-(--nc-text-primary)">
            Product Settings
          </h2>
          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Control how this product appears.
          </p>
        </div>
      </div>

      {settings.map((setting, index) => (
        <label
          key={setting.name}
          className={`flex cursor-pointer items-center justify-between gap-3 py-4 ${
            index === 0 ? "border-b border-(--nc-border-color)" : ""
          }`}
        >
          <div>
            <p className="text-sm font-bold text-(--nc-text-primary)">
              {setting.title}
            </p>
            <p className="mt-1 text-xs text-(--nc-text-secondary)">
              {setting.description}
            </p>
          </div>

          <input
            type="checkbox"
            name={setting.name}
            checked={Boolean(form[setting.name])}
            onChange={onChange}
            className="h-5 w-5 accent-(--nc-primary)"
          />
        </label>
      ))}
    </section>
  );
}

export default ProductSettings;
