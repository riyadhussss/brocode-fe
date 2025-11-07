export interface BankAccount {
  id: string;
  optionId: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface EWallet {
  id: string;
  optionId: string;
  name: string;
  displayName: string;
  description: string;
  walletType: string;
  walletNumber: string;
  walletName: string;
}

export interface PaymentData {
  bankAccounts: BankAccount[];
  eWallets: EWallet[];
}

export interface GetPaymentResponse {
  success: boolean;
  message: string;
  data: PaymentData;
}
