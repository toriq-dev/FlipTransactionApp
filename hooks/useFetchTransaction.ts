import { useState, useEffect, useCallback } from 'react';

export interface Transaction {
  id: string;
  sender_bank: string;
  beneficiary_bank: string;
  beneficiary_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://recruitment-test.flip.id/frontend-test');
      const data = await response.json();
      setTransactions(Object.values(data));
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error };
};
