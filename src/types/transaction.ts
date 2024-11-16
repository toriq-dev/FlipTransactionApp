export interface Transaction {
    id: string;
    sender_bank: string;
    beneficiary_bank: string;
    beneficiary_name: string;
    account_number: string;
    amount: number;
    remark: string;
    unique_code: number;
    created_at: string;
    status: string;
    completed_at: string;
    fee: number;
  }
