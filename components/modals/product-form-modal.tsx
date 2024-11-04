"use client";

import { ExtendedProduct } from "@/types";
import { ProductForm } from "../modal-forms/product-form";
import { Modal } from "../ui/modal";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ExtendedProduct;
}

function ProductFormModal({ isOpen, onClose, initialData }: ProductModalProps) {
  return (
    <Modal
      title="Add Product"
      description="Add a new product."
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProductForm initialData={initialData} />
    </Modal>
  );
}

export default ProductFormModal;
