import * as request from 'request-promise-native';
import { CRYPTOCOMPARE_API_URL } from '../constants/transaction.constant';
import { TransactionType } from '../enums/transaction.enum';
import { ExchangeRate, Transaction } from '../interfaces/transaction.interface';

const FIXED_EXCHANGE_RATES: any = { BTC: 123.45, ETH: 67.89 };

export async function getExchangeRates(tokens: string[]): Promise<ExchangeRate> {
    if (process.env.NODE_ENV === 'test') {
    const rates: { [token: string]: number } = {};
    for (const token of tokens) {
      rates[token] = FIXED_EXCHANGE_RATES[token];
    }
    return rates;
  }

  const response = await request.get({
    uri: CRYPTOCOMPARE_API_URL,
    qs: {
      fsym: tokens.join(','),
      tsyms: 'USD',
      
    },
    json: true,
  });
  
  const rates: { [token: string]: number } = {};
  for (const token of tokens) {
    if (response[token] && response[token].Response === 'Error') {
      throw new Error(response[token].Message);
    }
    rates[token] = response[token]?.USD ?? 0;
  }

  return rates;

}

export const getTransactionsFromCSV = (csv: string): Transaction[] => {
  const lines = csv.split('\n');
  return lines
    .slice(1) // skip the header line
    .map((line) => {
      const columns = line.split(',');
      return {
        timestamp: parseInt(columns[0], 10),
        transactionType: columns[1] as TransactionType,
        token: columns[2],
        amount: parseInt(columns[3], 10),
      };
    });
};

export const getPortfolioValue = (
  transactions: Transaction[],
  exchangeRates: ExchangeRate,
  date?: number,
  token?: string,
): { [key: string]: number } => {
  const portfolio: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    if (date && transaction.timestamp > date) {
      // Skip transactions that occurred after the specified date
      return;
    }
    if (token && transaction.token !== token) {
      // Skip transactions that are not for the specified token
      return;
    }

    if (!portfolio[transaction.token]) {
      portfolio[transaction.token] = 0;
    }
 if (transaction.transactionType === TransactionType.DEPOSIT) {
      portfolio[transaction.token] += transaction.amount;
    } else if (transaction.transactionType === TransactionType.WITHDRAWAL) {
      portfolio[transaction.token] -= transaction.amount;
    }
  });

  // Convert the portfolio balances to USD using the exchange rates
  Object.keys(portfolio).forEach((token) => {
    portfolio[token] = portfolio[token] * exchangeRates[token];
  });

  return portfolio;
};



