import { Budget } from '../../budgets/types/Budget';
import { Transaction } from '../../transactions/types/Transaction';

interface Analytics {
  name: string;
  value: number;
}

export interface Dashboard {
  analytics: Analytics[];
  date: string;
  recentTransaction: Transaction;
  recentOnGoingBudget: Budget;
}