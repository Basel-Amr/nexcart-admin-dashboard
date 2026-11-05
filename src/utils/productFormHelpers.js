export const EMPTY_PRODUCT_FORM = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  sku: "",
  category: "",
  subcategory: "",
  brand: "",
  tags: "",
  featured: false,
  isActive: true,
};

export const MAX_PRODUCT_IMAGES = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function unwrapProductResponse(response) {
  return (
    response?.product ?? response?.data?.product ?? response?.data ?? response
  );
}

export function getProductFormValues(product = {}) {
  const category =
    typeof product.category === "object"
      ? (product.category?.name ?? product.category?._id ?? "")
      : (product.category ?? "");

  const subcategory =
    typeof product.subcategory === "object"
      ? (product.subcategory?.name ?? product.subcategory?._id ?? "")
      : (product.subcategory ?? "");

  return {
    name: product.name ?? "",
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    price: product.price ?? "",
    discountPrice: product.discountPrice ?? "",
    stock: product.stock ?? "",
    sku: product.sku ?? "",
    category,
    subcategory,
    brand: product.brand ?? "",
    tags: Array.isArray(product.tags)
      ? product.tags.join(", ")
      : (product.tags ?? ""),
    featured: Boolean(product.featured),
    isActive: product.isActive ?? true,
  };
}

export function validateProductForm(form, images, existingImages = []) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!form.shortDescription.trim()) {
    errors.shortDescription = "Short description is required.";
  }

  if (!form.description.trim()) {
    errors.description = "Product description is required.";
  }

  if (!form.category.trim()) {
    errors.category = "Category is required.";
  }

  if (
    form.price === "" ||
    !Number.isFinite(Number(form.price)) ||
    Number(form.price) <= 0
  ) {
    errors.price = "Enter a valid price greater than zero.";
  }

  if (
    form.discountPrice !== "" &&
    (!Number.isFinite(Number(form.discountPrice)) ||
      Number(form.discountPrice) <= 0 ||
      Number(form.discountPrice) >= Number(form.price))
  ) {
    errors.discountPrice =
      "Discount price must be positive and lower than the regular price.";
  }

  if (
    form.stock === "" ||
    !Number.isInteger(Number(form.stock)) ||
    Number(form.stock) < 0
  ) {
    errors.stock = "Enter a valid whole number of 0 or more.";
  }

  if (images.length === 0 && existingImages.length === 0) {
    errors.images = "Please upload at least one product image.";
  }

  return errors;
}

export function buildProductFormData(form, images) {
  const payload = new FormData();

  payload.append("name", form.name.trim());
  payload.append("shortDescription", form.shortDescription.trim());
  payload.append("description", form.description.trim());
  payload.append("price", String(Number(form.price)));
  payload.append("stock", String(Number(form.stock)));
  payload.append("category", form.category.trim());
  payload.append("featured", String(Boolean(form.featured)));
  payload.append("isActive", String(Boolean(form.isActive)));

  if (form.discountPrice !== "") {
    payload.append("discountPrice", String(Number(form.discountPrice)));
  }

  if (form.sku.trim()) {
    payload.append("sku", form.sku.trim());
  }

  if (form.subcategory.trim()) {
    payload.append("subcategory", form.subcategory.trim());
  }

  if (form.brand.trim()) {
    payload.append("brand", form.brand.trim());
  }

  if (form.tags.trim()) {
    payload.append(
      "tags",
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .join(","),
    );
  }

  images.forEach((image) => {
    payload.append("images", image);
  });

  return payload;
}

export function getProductImageUrls(product) {
  const rawImages = product?.images ?? product?.image ?? [];

  const imageList = Array.isArray(rawImages) ? rawImages : [rawImages];

  return imageList
    .map((image) => {
      if (typeof image === "string") return image;
      return image?.url ?? image?.secure_url ?? image?.path ?? "";
    })
    .filter(Boolean);
}
