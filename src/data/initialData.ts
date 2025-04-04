import { templates } from './templates';
import { generateReceiptNumber } from '../utils/receipt';

export const getInitialReceiptData = () => ({
  storeName: templates[0].defaultStoreName,
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString(),
  items: [],
  template: templates[0],
  receiptNumber: generateReceiptNumber(),
  roomNumber: '',
  patientId: '',
  serviceDate: '',
  invoiceNumber: '',
  footerText: 'thankYou',
  paymentInfo: {
    method: 'Credit Card',
    cardLastFour: '4242',
    transactionId: generateReceiptNumber(),
  },
});