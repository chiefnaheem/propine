import { TransactionType } from "../enums/transaction.enum";

// export interface Transaction {
//   timestamp: number;
//   transactionType: TransactionType;
//   token: string;
//   amount: number;
// }

export interface ExchangeRate {
  [token: string]: number;
}

export interface Transaction {
  timestamp: number;
  transactionType: TransactionType;
  token: string;
  amount: number;
}

interface Portfolio {
  [token: string]: number;
}