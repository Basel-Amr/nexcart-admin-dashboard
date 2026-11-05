import { useRef } from "react";

function ProductImages({
  images,
  existingImages = [],
  onAddImages,
  onRemoveImage,
  onRemoveExistingImage,
  errors = {},
}) {
  const inputRef = useRef(null);

  return (
    <section className="rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-images" />
        </div>
        <div>
          <h2 className="text-base font-bold text-(--nc-text-primary)">
            Product Images
          </h2>
          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            Upload clear images to showcase your product.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onAddImages}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-(--nc-border-color) px-5 py-9 text-center transition hover:border-(--nc-primary) hover:bg-(--nc-primary)/5"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-cloud-arrow-up text-2xl" />
        </span>

        <span className="mt-4 text-sm font-bold text-(--nc-text-primary)">
          Click to upload product images
        </span>

        <span className="mt-2 text-xs text-(--nc-text-secondary)">
          PNG, JPG, WEBP · Up to 5 MB per image · Maximum 5 images
        </span>

        <span className="mt-4 rounded-lg bg-(--nc-primary) px-4 py-2 text-xs font-bold text-white">
          Browse Files
        </span>
      </button>

      {errors.images && (
        <p className="mt-2 text-xs text-rose-500">{errors.images}</p>
      )}

      {(existingImages.length > 0 || images.length > 0) && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-(--nc-text-primary)">
              Image Gallery
            </p>
            <span className="text-xs text-(--nc-text-secondary)">
              {existingImages.length + images.length} / 5
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {existingImages.map((image, index) => (
              <div
                key={`existing-${image}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-(--nc-border-color) bg-(--nc-hover-bg)"
              >
                <img
                  src={image}
                  alt={`Existing product ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/75 px-2 py-1 text-[9px] font-bold text-white">
                  Saved Image
                </span>

                {onRemoveExistingImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(index)}
                    aria-label="Remove saved image"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white transition hover:bg-rose-500"
                  >
                    <i className="fa-solid fa-xmark text-xs" />
                  </button>
                )}
              </div>
            ))}

            {images.map((image, index) => (
              <div
                key={`${image.name}-${image.lastModified}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-(--nc-border-color) bg-(--nc-hover-bg)"
              >
                <img
                  src={image.preview}
                  alt={`New product image ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                <span className="absolute bottom-2 left-2 rounded-md bg-(--nc-primary) px-2 py-1 text-[9px] font-bold text-white">
                  New Image
                </span>

                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  aria-label="Remove new image"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white transition hover:bg-rose-500"
                >
                  <i className="fa-solid fa-xmark text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductImages;
