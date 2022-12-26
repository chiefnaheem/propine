import { getExchangeRates, getTransactionsFromCSV, getPortfolioValue } from '../utils/helper';
import { TransactionType } from '../enums/transaction.enum';

describe('getExchangeRates', () => {
  it('should return the exchange rates for the given tokens', async () => {
    const exchangeRates = await getExchangeRates(['BTC', 'ETH']);
    expect(exchangeRates).toEqual({ BTC: 123.45, ETH: 67.89 });
  });
});

describe('getTransactionsFromCSV', () => {
  it('should return an array of transactions from the given CSV string', () => {
    const csv = `timestamp,transaction_type,token,amount
                 1234567890,DEPOSIT,BTC,1
                 1234567891,WITHDRAWAL,ETH,2`;
    const transactions = getTransactionsFromCSV(csv);
    expect(transactions).toEqual([
      { timestamp: 1234567890, transactionType: 'DEPOSIT', token: 'BTC', amount: 1 },
      { timestamp: 1234567891, transactionType: 'WITHDRAWAL', token: 'ETH', amount: 2 },
    ]);
  });
});

describe('getPortfolioValue', () => {
  it('should return the portfolio value in USD for the given transactions and exchange rates', () => {
    const transactions = [
      { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
      { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
    ];
    const exchangeRates = { BTC: 123.45, ETH: 67.89 };
const portfolio = getPortfolioValue(transactions, exchangeRates);
expect(portfolio).toEqual({ BTC: 123.45, ETH: -135.78 });
  })
});

describe('getPortfolioValue', () => {
  
  it('should filter the transactions by date if a date argument is provided', () => {
    const transactions = [
      { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
      { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
      { timestamp: 1234567892, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 3 },
    ];
    const exchangeRates = { BTC: 123.45, ETH: 67.89 };
    const portfolio = getPortfolioValue(transactions, exchangeRates, 1234567891);
    expect(portfolio).toEqual({ BTC: 123.45, ETH: -135.78 });
  });

  it('should return the latest portfolio value in USD for all tokens if no arguments are provided', () => {
    const transactions = [
      { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
      { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
    ];
    const exchangeRates = { BTC: 123.45, ETH: 67.89 };
    const portfolio = getPortfolioValue(transactions, exchangeRates);
    expect(portfolio).toEqual({ BTC: 123.45, ETH: -135.78 });
  });

  it('should return the latest portfolio value in USD for the given token if a token argument is provided', () => {
    const transactions = [
      { timestamp: 1234567890, transactionType: 'DEPOSIT', token: 'BTC', amount: 1 },
      { timestamp: 1234567891, transactionType: 'WITHDRAWAL', token: 'ETH', amount: 2 },
    ];
    const exchangeRates = { BTC: 123.45, ETH: 67.89 };
    const portfolio = getPortfolioValue(transactions, exchangeRates, undefined, 'BTC');
    expect(portfolio).toEqual({ BTC: 123.45 });
  });

//   it('should filter the transactions by token if a token argument is provided', () => {
//     const transactions = [
//       { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
//       { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
//       { timestamp: 1234567892, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 3 },
//     ];
//     const exchangeRates = { BTC: 123.45, ETH: 67.89 };
//     const portfolio = getPortfolioValue(transactions, exchangeRates, undefined, 'BTC');
//     expect(portfolio).toEqual({ BTC: 246.9 });
//   });

//   it('should return an empty object if no transactions are found for the given date or token', () => {
//     const transactions = [
//       { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
//       { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
//     ];
//     const exchangeRates = { BTC: 123.45, ETH: 67.89 };
//     let portfolio = getPortfolioValue(transactions, exchangeRates, 1234567892);
//     expect(portfolio).toEqual({});
//     portfolio = getPortfolioValue(transactions, exchangeRates, undefined, 'XRP');
//     expect(portfolio).toEqual({});
//   });

//   it('should return an empty object if the exchange rates are not available for a given token', () => {
//     const transactions = [
//       { timestamp: 1234567890, transactionType: TransactionType.DEPOSIT, token: 'BTC', amount: 1 },
//       { timestamp: 1234567891, transactionType: TransactionType.WITHDRAWAL, token: 'ETH', amount: 2 },
//     ];
//     const exchangeRates = { BTC: 123.45 };
//     const portfolio = getPortfolioValue(transactions, exchangeRates);
//     expect(portfolio).toEqual({});
//   });


});
