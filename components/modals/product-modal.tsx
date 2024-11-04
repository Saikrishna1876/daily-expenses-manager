import * as z from "zod";

import { OrderProductForm } from "../modal-forms/order-product-form";
import { OrderProductFormSchema } from "@/schemas";
import { Modal } from "../ui/modal";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof OrderProductFormSchema>) => void;
  initialData?: z.infer<typeof OrderProductFormSchema>;
}

function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) {
  return (
    <Modal
      title="Add product"
      description="Add product to your order."
      isOpen={isOpen}
      onClose={onClose}
    >
      <OrderProductForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
}

export default ProductModal;
