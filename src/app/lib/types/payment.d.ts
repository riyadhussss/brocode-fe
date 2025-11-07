export type PaymentMethodType = "bank_transfer" | "e_wallet";

export interface PaymentOptionBase {
  _id: string;
  type: PaymentMethodType;
  name: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  optionId: string;
  __v: number;
}

export interface BankTransferOption extends PaymentOptionBase {
  type: "bank_transfer";
  accountNumber: string;
  accountName: string;
}

export interface EWalletOption extends PaymentOptionBase {
  type: "e_wallet";
  phoneNumber: string;
  walletName: string;
}

export type PaymentOption = BankTransferOption | EWalletOption;

export interface GetPaymentMethodsResponse {
  success: boolean;
  message: string;
  data: {
    all: PaymentOption[];
    grouped: {
      bank_transfer: BankTransferOption[];
      e_wallet: EWalletOption[];
    };
    totals: {
      banks: number;
      eWallets: number;
      total: number;
    };
  };
}

export interface GetPaymentMethodByIdResponse {
  success: boolean;
  message: string;
  data: PaymentOption;
}

// 🏦📱 Request gabungan
export type AddPaymentMethodRequest =
  | AddBankPaymentMethodRequest
  | AddEWalletPaymentMethodRequest;

export interface AddBankPaymentMethodRequest {
  type: "bank_transfer";
  name: string;
  accountNumber: string;
  accountName: string;
  sortOrder?: number; // default 0
  isActive: boolean;
}

export interface AddEWalletPaymentMethodRequest {
  type: "e_wallet";
  name: string;
  phoneNumber: string;
  walletName: string;
  sortOrder?: number; // default 0
  isActive: boolean;
}

// 📬 Response gabungan
export interface AddPaymentMethodResponse {
  success: boolean;
  message: string;
  data: PaymentMethod;
}

// 💳 Union untuk semua tipe payment method
export type PaymentMethod = BankPaymentMethod | EWalletPaymentMethod;

export interface BankPaymentMethod {
  _id: string;
  optionId: string;
  type: "bank_transfer";
  name: string;
  accountNumber: string;
  accountName: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EWalletPaymentMethod {
  _id: string;
  optionId: string;
  type: "e_wallet";
  name: string;
  phoneNumber: string;
  walletName: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type EditPaymentMethodRequest =
  | EditBankPaymentMethodRequest
  | EditEWalletPaymentMethodRequest;

// 🏦 Edit Bank Payment Method
export interface EditBankPaymentMethodRequest {
  type: "bank_transfer";
  name?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  isActive?: boolean;
}

// 📱 Edit E-Wallet Payment Method
export interface EditEWalletPaymentMethodRequest {
  type: "e_wallet";
  name?: string;
  walletType?: string;
  walletNumber?: string;
  walletName?: string;
  isActive?: boolean;
}

// 📬 Response untuk edit (struktur mirip Add)
export interface EditPaymentMethodResponse {
  success: boolean;
  message: string;
  data: PaymentMethod;
}

export interface DeletePaymentMethodResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    type: "bank_transfer" | "e_wallet";
  };
}
