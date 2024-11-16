import { Transaction } from '../types/transaction';

export const sortTransactions = (
  transactions: Transaction[],
  type: string
): Transaction[] => {
  return [...transactions].sort((a, b) => {
    if (type === 'name-asc') {
      return a.beneficiary_name.localeCompare(b.beneficiary_name);
    }
    if (type === 'name-desc') {
      return b.beneficiary_name.localeCompare(a.beneficiary_name);
    }
    if (type === 'date-newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (type === 'date-oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });
};
