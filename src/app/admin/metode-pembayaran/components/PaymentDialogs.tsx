"use client";

import { AddPaymentDialog } from "./AddPaymentDialog";
import { EditPaymentDialog } from "./EditPaymentDialog";
import { DeletePaymentDialog } from "./DeletePaymentDialog";

interface PaymentDialogsProps {
  // Add Dialog
  showAddDialog: boolean;
  onAddDialogChange: (open: boolean) => void;
  onAddSuccess: () => void;

  // Edit Dialog
  editDialog: {
    open: boolean;
    paymentId: string;
  };
  onEditDialogChange: (open: boolean) => void;
  onEditSuccess: () => void;

  // Delete Dialog
  deleteDialog: {
    open: boolean;
    paymentId: string;
    paymentName: string;
  };
  onDeleteDialogChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function PaymentDialogs({
  showAddDialog,
  onAddDialogChange,
  onAddSuccess,
  editDialog,
  onEditDialogChange,
  onEditSuccess,
  deleteDialog,
  onDeleteDialogChange,
  onDeleteSuccess,
}: PaymentDialogsProps) {
  return (
    <>
      {/* Add Payment Dialog */}
      <AddPaymentDialog
        open={showAddDialog}
        onOpenChange={onAddDialogChange}
        onSuccess={onAddSuccess}
      />

      {/* Edit Payment Dialog */}
      <EditPaymentDialog
        open={editDialog.open}
        onOpenChange={onEditDialogChange}
        onSuccess={onEditSuccess}
        paymentId={editDialog.paymentId}
      />

      {/* Delete Payment Dialog */}
      <DeletePaymentDialog
        open={deleteDialog.open}
        onOpenChange={onDeleteDialogChange}
        onSuccess={onDeleteSuccess}
        paymentId={deleteDialog.paymentId}
        paymentName={deleteDialog.paymentName}
      />
    </>
  );
}
