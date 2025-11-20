interface TotalPriceSectionProps {
  totalPrice: number;
  formatCurrency: (amount: number) => string;
}

export default function TotalPriceSection({
  totalPrice,
  formatCurrency,
}: TotalPriceSectionProps) {
  if (totalPrice === 0) return null;

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">
          Total Pembayaran:
        </span>
        <span className="text-2xl font-bold text-blue-600">
          {formatCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
}
