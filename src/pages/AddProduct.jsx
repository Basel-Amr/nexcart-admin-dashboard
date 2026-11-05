import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../api/products";
import ProductForm from "../components/products/form/ProductForm";

function AddProduct() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleCreateProduct = async (payload) => {
    try {
      setSubmitting(true);
      setSubmitError("");

      await createProduct(payload);

      navigate("/products", {
        replace: true,
        state: {
          productCreated: true,
          message: "Product created successfully!",
        },
      });
    } catch (error) {
      console.error("Create product error:", error);

      setSubmitError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to create product. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProductForm
      mode="add"
      onSubmit={handleCreateProduct}
      submitting={submitting}
      submitError={submitError}
    />
  );
}

export default AddProduct;
