import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Transaction } from '../types/transaction';

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
}

type Action =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
};

const transactionReducer = (state: TransactionState, action: Action): TransactionState => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, filteredTransactions: action.payload };
    default:
      return state;
  }
};

const TransactionContext = createContext<{
  state: TransactionState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});


export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
