function ProductFormActions({ mode = "add", submitting, error, onCancel }) {
  const isEdit = mode === "edit";

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm">
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs leading-5 text-rose-500"
        >
          <i className="fa-solid fa-circle-exclamation mr-2" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--nc-primary) px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <i className="fa-solid fa-circle-notch animate-spin" />
            {isEdit ? "Saving Changes..." : "Creating Product..."}
          </>
        ) : (
          <>
            <i
              className={
                isEdit ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus"
              }
            />
            {isEdit ? "Save Changes" : "Create Product"}
          </>
        )}
      </button>

      <button
        type="button"
        disabled={submitting}
        onClick={onCancel}
        className="mt-3 min-h-11 w-full rounded-xl border border-(--nc-border-color) px-4 py-3 text-sm font-semibold text-(--nc-text-secondary) transition hover:bg-(--nc-hover-bg) disabled:opacity-50"
      >
        Cancel
      </button>

      <p className="mt-4 text-center text-[10px] leading-5 text-(--nc-text-secondary)">
        <i className="fa-solid fa-lock mr-1" />
        Your product information is submitted to your store API.
      </p>
    </section>
  );
}

export default ProductFormActions;
