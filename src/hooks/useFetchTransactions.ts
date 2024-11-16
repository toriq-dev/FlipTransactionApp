import { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/transactionService';
import { Transaction } from '../types/transaction';

export const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTransactions();
        const transactionArray: Transaction[] = Object.values(data);
        setTransactions(transactionArray);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return { transactions, loading, error };
};
