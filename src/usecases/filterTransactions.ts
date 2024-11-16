import { Transaction } from '../types/transaction';

export const filterTransactions = (transactions: Transaction[], text: string): Transaction[] => {
  return transactions.filter((transaction) => {
    const nameMatch = transaction.beneficiary_name
      .toLowerCase()
      .includes(text.toLowerCase());
    const senderBankMatch = transaction.sender_bank
      .toLowerCase()
      .includes(text.toLowerCase());
    const beneficiaryBankMatch = transaction.beneficiary_bank
      .toLowerCase()
      .includes(text.toLowerCase());
    const amountMatch = transaction.amount.toString().includes(text);

    return nameMatch || senderBankMatch || beneficiaryBankMatch || amountMatch;
  });
};
