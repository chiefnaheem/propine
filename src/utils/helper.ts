import * as request from 'request-promise-native';
import { CRYPTOCOMPARE_API_URL } from '../constants/transaction.constant';
import { TransactionType } from '../enums/transaction.enum';
import { ExchangeRate, Transaction } from '../interfaces/transaction.interface';

export async function getExchangeRates(tokens: string[]): Promise<ExchangeRate> {
    try {
  const response = await request.get({
    uri: CRYPTOCOMPARE_API_URL,
    qs: {
      fsym: tokens.join(','),
      tsyms: 'USD',
      api_key: process.env.API_KEY
    },
    json: true,
  });
  return response;
  } catch (error: any) {
    console.error(`Error getting exchange rate for ${tokens}: ${error.message}`);
    
  }

}

export function parseTransaction(data: string[]): Transaction {
  return {
    timestamp: Number(data[0]),
    transactionType: data[1] as TransactionType,
    token: data[2],
    amount: Number(data[3]),
  };
}