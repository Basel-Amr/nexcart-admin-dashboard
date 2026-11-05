import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById, updateProduct } from "../api/products";

import ProductForm from "../components/products/form/ProductForm";
import LoadingPage from "./LoadingPage";

import { unwrapProductResponse } from "../utils/productFormHelpers";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setPageError("");

        const response = await getProductById(productId);
        const productData = unwrapProductResponse(response);

        if (!productData || typeof productData !== "object") {
          throw new Error("Product information was not found.");
        }

        if (isMounted) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Fetch product error:", error);

        if (isMounted) {
          setPageError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load this product.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setPageError("Product ID is missing.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleUpdateProduct = async (payload) => {
    try {
      setSubmitting(true);
      setSubmitError("");

      await updateProduct(productId, payload);

      navigate("/products", {
        replace: true,
        state: {
          productUpdated: true,
          message: "Product updated successfully!",
        },
      });
    } catch (error) {
      console.error("Update product error:", error);

      setSubmitError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to update product. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (pageError || !product) {
    return (
      <div className="min-h-[60vh] bg-(--nc-page-bg) p-5 sm:p-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <i className="fa-solid fa-triangle-exclamation text-xl" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-(--nc-text-primary)">
            Unable to Load Product
          </h2>

          <p className="mt-2 text-sm text-(--nc-text-secondary)">
            {pageError || "This product could not be found."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-(--nc-primary) px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-xl border border-(--nc-border-color) px-5 py-2.5 text-sm font-semibold text-(--nc-text-secondary) transition hover:bg-(--nc-hover-bg)"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      product={product}
      onSubmit={handleUpdateProduct}
      submitting={submitting}
      submitError={submitError}
    />
  );
}

export default EditProduct;
