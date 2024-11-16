export const fetchTransactions = async () => {
    const response = await fetch('https://recruitment-test.flip.id/frontend-test');
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  };
