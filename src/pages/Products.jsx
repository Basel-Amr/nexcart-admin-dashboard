import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts, searchProducts, deleteProduct } from "../api/products";
import LoadingPage from "./LoadingPage";

import ProductStats from "../components/products/ProductStats";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

import {
  extractProducts,
  extractPagination,
  getProductId,
  getProductLabel,
} from "../utils/productHelpers";

const PAGE_SIZE = 12;

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong while loading products."
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [facetProducts, setFacetProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sort, setSort] = useState("newest");

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    totalItems: 0,
    totalPages: 1,
  });

  // Refresh after delete
  const [refreshKey, setRefreshKey] = useState(0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Load category/subcategory options from real products
  useEffect(() => {
    let isMounted = true;

    const loadFacets = async () => {
      try {
        const response = await getProducts({
          page: 1,
          limit: 100,
        });

        if (!isMounted) return;

        setFacetProducts(extractProducts(response));
      } catch (err) {
        console.error("Failed to load product categories:", err);
      }
    };

    loadFacets();

    return () => {
      isMounted = false;
    };
  }, []);

  // Load products using the documented search endpoint
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");
      setActionMessage("");

      try {
        const params = {
          page,
          limit: PAGE_SIZE,
        };

        if (debouncedSearch) {
          params.search = debouncedSearch;
        }

        if (category) {
          params.category = category;
        }

        if (subcategory) {
          params.subcategory = subcategory;
        }

        // "newest" is the UI default, so omit sort and
        // allow the API's default ordering.
        if (sort !== "newest") {
          params.sort = sort;
        }

        const response = await searchProducts(params);

        if (!isMounted) return;

        const result = extractProducts(response);

        setProducts(result);
        setPagination(
          extractPagination(response, page, PAGE_SIZE, result.length),
        );
      } catch (err) {
        if (!isMounted) return;

        console.error("Products API error:", err);
        setError(getErrorMessage(err));
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [page, debouncedSearch, category, subcategory, sort, refreshKey]);

  // Categories from real API products
  const categories = useMemo(() => {
    const values = facetProducts
      .map((product) => getProductLabel(product.category))
      .filter((value) => value !== "Uncategorized");

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [facetProducts]);

  // Subcategories belonging to the selected category
  const subcategories = useMemo(() => {
    if (!category) return [];

    const values = facetProducts
      .filter((product) => getProductLabel(product.category) === category)
      .map((product) => getProductLabel(product.subcategory))
      .filter((value) => value !== "Uncategorized");

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [facetProducts, category]);

  // Statistics from the current API result
  const stats = useMemo(() => {
    return {
      total: pagination.totalItems,
      featured: products.filter((product) => product.featured).length,
      lowStock: products.filter((product) => {
        const stock = Number(product.stock) || 0;
        return stock > 0 && stock <= 5;
      }).length,
      outOfStock: products.filter((product) => Number(product.stock) <= 0)
        .length,
    };
  }, [products, pagination.totalItems]);

  // Filter handlers
  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
    setPage(1);
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("");
    setSubcategory("");
    setSort("newest");
    setPage(1);
  };

  // Delete product
  const handleDeleteProduct = useCallback(async (product) => {
    const productId = getProductId(product);

    if (!productId) {
      setError("This product does not have a valid ID.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name || "this product"}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(productId);
      setError("");
      setActionMessage("");

      await deleteProduct(productId);

      setActionMessage("Product deleted successfully.");

      // Refresh current list and statistics
      setRefreshKey((previous) => previous + 1);
    } catch (err) {
      console.error("Delete product error:", err);
      setError(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  }, []);

  // Loading state
  if (loading && products.length === 0) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen space-y-6 bg-(--nc-page-bg) p-4 text-(--nc-text-primary) transition-colors duration-200 sm:p-6 lg:p-8">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-(--nc-primary)/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--nc-primary)">
              <i className="fa-solid fa-cubes-stacked" />
              Store Management
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-(--nc-text-primary) sm:text-3xl">
              Products
              <span className="ml-2 text-(--nc-primary)">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-(--nc-text-secondary)">
              Manage your catalog, monitor inventory, and keep your store
              products organized in one place.
            </p>
          </div>

          <Link
            to="/products/new"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-(--nc-primary) px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl"
          >
            <i className="fa-solid fa-plus" />
            Add New Product
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <ProductStats stats={stats} />

      {/* Search and Filters */}
      <ProductToolbar
        search={search}
        category={category}
        subcategory={subcategory}
        sort={sort}
        categories={categories}
        subcategories={subcategories}
        onSearchChange={setSearch}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
      />

      {/* Feedback */}
      {actionMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-500">
          <i className="fa-solid fa-circle-check" />
          {actionMessage}
        </div>
      )}

      {error && (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation" />
            <span>{error}</span>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey((previous) => previous + 1)}
            className="w-fit font-bold underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      )}

      {/* Products Heading */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-bold text-(--nc-text-primary)">
            Your Product Catalog
          </h2>

          <p className="mt-1 text-xs text-(--nc-text-secondary)">
            {pagination.totalItems.toLocaleString("en-US")} matching products
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-(--nc-text-secondary)">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Live API data
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-(--nc-border-color) bg-(--nc-surface)">
          <div className="flex items-center gap-3 text-sm text-(--nc-text-secondary)">
            <i className="fa-solid fa-circle-notch animate-spin text-(--nc-primary)" />
            Updating products...
          </div>
        </div>
      ) : (
        <>
          <ProductGrid products={products} onDelete={handleDeleteProduct} />

          <ProductPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            limit={pagination.limit}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Products;
