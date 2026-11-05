import { useEffect, useMemo, useState } from "react";

import ProductFormHeader from "./ProductFormHeader";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductOrganization from "./ProductOrganization";
import ProductPricingInventory from "./ProductPricingInventory";
import ProductImages from "./ProductImages";
import ProductSettings from "./ProductSettings";
import ProductPreview from "./ProductPreview";
import ProductFormActions from "./ProductFormActions";

import {
  EMPTY_PRODUCT_FORM,
  MAX_IMAGE_SIZE,
  MAX_PRODUCT_IMAGES,
  buildProductFormData,
  getProductFormValues,
  getProductImageUrls,
  validateProductForm,
} from "../../../utils/productFormHelpers";

function ProductForm({
  mode = "add",
  product = null,
  onSubmit,
  submitting = false,
  submitError = "",
}) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_PRODUCT_FORM,
    ...(product ? getProductFormValues(product) : {}),
  }));

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const existingImages = useMemo(() => getProductImageUrls(product), [product]);

  const imagePreviews = useMemo(
    () =>
      images.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    [images],
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (product) {
      setForm({
        ...EMPTY_PRODUCT_FORM,
        ...getProductFormValues(product),
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setFormError("");
  };

  const handleAddImages = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    event.target.value = "";

    if (!selectedFiles.length) return;

    let message = "";
    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        message = "Only image files are allowed.";
        return false;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        message = `${file.name} exceeds the 5 MB image limit.`;
        return false;
      }

      return true;
    });

    setImages((previous) => {
      const availableSlots = Math.max(
        0,
        MAX_PRODUCT_IMAGES - existingImages.length - previous.length,
      );

      const uniqueFiles = validFiles.filter(
        (file) =>
          !previous.some(
            (item) =>
              item.name === file.name &&
              item.size === file.size &&
              item.lastModified === file.lastModified,
          ),
      );

      if (uniqueFiles.length > availableSlots) {
        message = `You can add only ${availableSlots} more image(s).`;
      }

      return [...previous, ...uniqueFiles.slice(0, availableSlots)];
    });

    setErrors((previous) => ({ ...previous, images: "" }));
    setFormError(message);
  };

  const handleRemoveImage = (index) => {
    setImages((previous) => previous.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const nextErrors = validateProductForm(form, images, existingImages);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please review the highlighted fields.");
      return;
    }

    const payload = buildProductFormData(form, images);

    await onSubmit(payload);
  };

  const previewImage = imagePreviews[0]?.preview || existingImages[0] || "";

  return (
    <div className="min-h-screen space-y-6 bg-(--nc-page-bg) p-4 text-(--nc-text-primary) transition-colors duration-200 sm:p-6 lg:p-8">
      <ProductFormHeader mode={mode} productName={form.name} />

      <form onSubmit={handleFormSubmit} noValidate>
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            <ProductBasicInfo
              form={form}
              onChange={handleChange}
              errors={errors}
            />

            <ProductOrganization
              form={form}
              onChange={handleChange}
              errors={errors}
            />

            <ProductPricingInventory
              form={form}
              onChange={handleChange}
              errors={errors}
            />

            <ProductImages
              images={imagePreviews}
              existingImages={existingImages}
              onAddImages={handleAddImages}
              onRemoveImage={handleRemoveImage}
              errors={errors}
            />
          </div>

          <aside className="space-y-5 xl:sticky xl:top-24">
            <ProductSettings form={form} onChange={handleChange} />

            <ProductPreview form={form} image={previewImage} />

            <ProductFormActions
              mode={mode}
              submitting={submitting}
              error={formError || submitError}
              onCancel={() => window.history.back()}
            />
          </aside>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
