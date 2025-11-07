"use client";

import { useState } from "react";
import type { PaymentMethodRowData } from "../../columns";

export function usePaymentDialogs() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState({
    open: false,
    paymentId: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    paymentId: "",
    paymentName: "",
  });

  // Handle add new payment method
  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  // Handle edit payment method
  const handleEdit = (payment: PaymentMethodRowData) => {
    setEditDialog({
      open: true,
      paymentId: payment._id,
    });
  };

  // Handle delete payment method
  const handleDelete = (payment: PaymentMethodRowData) => {
    setDeleteDialog({
      open: true,
      paymentId: payment._id,
      paymentName: payment.bankName,
    });
  };

  return {
    // Add Dialog
    showAddDialog,
    setShowAddDialog,
    handleAddNew,

    // Edit Dialog
    editDialog,
    setEditDialog,
    handleEdit,

    // Delete Dialog
    deleteDialog,
    setDeleteDialog,
    handleDelete,
  };
}
