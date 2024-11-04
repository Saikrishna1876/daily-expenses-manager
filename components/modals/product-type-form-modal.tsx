"use client";

import { ProductType } from "@prisma/client";
import { ProductTypeForm } from "../modal-forms/product-type-form";
import { Modal } from "../ui/modal";
import { ExtendedProductType } from "@/types";

interface ProductTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ExtendedProductType;
}

function ProductTypeFormModal({
  isOpen,
  onClose,
  initialData,
}: ProductTypeModalProps) {
  return (
    <Modal
      title="Add Product Type"
      description="Add product type."
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProductTypeForm initialData={initialData} />
    </Modal>
  );
}

export default ProductTypeFormModal;
