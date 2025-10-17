export interface ReceiptItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface PaymentInfo {
  method: string;
  cardLastFour?: string;
  transactionId: string;
}

export interface Receipt {
  storeName: string;
  date: string;
  time: string;
  items: ReceiptItem[];
  template: ReceiptTemplate;
  receiptNumber: string;
  roomNumber: string;
  patientId: string;
  serviceDate: string;
  invoiceNumber: string;
  propertyAddress: string;
  purchaseAmount: number;
  balancePayment: number;
  footerText: string;
  paymentInfo: PaymentInfo;
}

export interface ReceiptTemplate {
  id: string;
  name: string;
  icon: JSX.Element;
  defaultStoreName: string;
  thermalTexture: string;
  showTip: boolean;
  showTax: boolean;
  itemLabel: string;
  priceLabel: string;
  quantityLabel: string;
  fields: {
    description: boolean;
    roomNumber?: boolean;
    patientId?: boolean;
    serviceDate?: boolean;
    invoiceNumber?: boolean;
    propertyAddress?: boolean;
    purchaseAmount?: boolean;
    balancePayment?: boolean;
  };
}

export const TAX_RATE = 0.0825; // 8.25% tax rate

export const generateReceiptNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${random}`;
};

export const renderFormatCurrency =
  (language: string) =>
  (amount: number): string => {
    const currency = language === "zh" ? "CNY" : "USD";
    return new Intl.NumberFormat(language, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
