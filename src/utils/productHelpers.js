export function getProductId(product) {
  if (!product || typeof product !== "object") return "";

  const id = product._id ?? product.id ?? product.productId;

  return id == null ? "" : String(id);
}

export function getProductLabel(value) {
  if (value == null || value === "") return "Uncategorized";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    return (
      value.name ?? value.title ?? value.label ?? value._id ?? "Uncategorized"
    );
  }

  return "Uncategorized";
}

export function getProductImage(product) {
  if (!product || typeof product !== "object") return "";

  const images = product.images;

  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];

    if (typeof first === "string") return first;

    if (first && typeof first === "object") {
      return first.url ?? first.secure_url ?? first.src ?? "";
    }
  }

  if (typeof images === "string") return images;

  if (typeof product.image === "string") return product.image;

  if (product.image && typeof product.image === "object") {
    return (
      product.image.url ?? product.image.secure_url ?? product.image.src ?? ""
    );
  }

  return "";
}

export function extractProducts(response) {
  // API service functions return the response body directly.
  // These fallbacks also support common nested response envelopes.
  const candidates = [
    response?.products,
    response?.data?.products,
    response?.data?.data?.products,
    response?.data,
    response?.results,
    response?.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
}

export function extractPagination(
  response,
  currentPage = 1,
  pageSize = 12,
  resultLength = 0,
) {
  const source =
    response?.pagination ??
    response?.meta?.pagination ??
    response?.data?.pagination ??
    response?.data?.meta?.pagination ??
    response?.meta ??
    response?.data ??
    response ??
    {};

  const page = Math.max(
    1,
    Number(source.page ?? source.currentPage ?? currentPage) || currentPage,
  );

  const limit = Math.max(
    1,
    Number(source.limit ?? source.pageSize ?? pageSize) || pageSize,
  );

  const totalItems = Math.max(
    0,
    Number(
      source.totalItems ??
        source.totalProducts ??
        source.total ??
        source.count ??
        response?.totalProducts ??
        response?.total ??
        resultLength,
    ) || 0,
  );

  const calculatedPages = Math.max(1, Math.ceil(totalItems / limit));

  const totalPages = Math.max(
    1,
    Number(source.totalPages ?? source.pages ?? calculatedPages) ||
      calculatedPages,
  );

  return {
    page: Math.min(page, totalPages),
    limit,
    totalItems,
    totalPages,
  };
}

export function formatProductPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) return "—";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getProductStock(product) {
  const stock = Number(product?.stock);

  return Number.isFinite(stock) ? stock : 0;
}
