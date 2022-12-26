import * as utils from '../utils/helper';
import { getExchangeRates, getTransactionsFromCSV, getPortfolioValue } from './';

describe('getExchangeRates', () => {
  it('should return the exchange rates for the given tokens', async () => {
    const exchangeRates = await getExchangeRates(['BTC', 'ETH']);
    expect(exchangeRates).toEqual({ BTC: 123.45, ETH: 67.89 });
  });
});