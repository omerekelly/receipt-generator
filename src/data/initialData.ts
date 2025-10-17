import { generateReceiptNumber } from "../utils/receipt";
import { templates } from "./templates";

export const getInitialReceiptData = () => ({
  storeName: templates[0].defaultStoreName,
  date: new Date().toISOString().split("T")[0],
  time: new Date().toLocaleTimeString(),
  items: [],
  template: templates[0],
  receiptNumber: generateReceiptNumber(),
  roomNumber: "",
  patientId: "",
  serviceDate: "",
  invoiceNumber: "",
  propertyAddress: "",
  purchaseAmount: 0,
  balancePayment: 0,
  customerName: "",
  footerText: "thankYou",
  paymentInfo: {
    method: "Credit Card",
    cardLastFour: "4242",
    transactionId: generateReceiptNumber(),
  },
});
