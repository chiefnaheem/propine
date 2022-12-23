async function getExchangeRates(tokens: string[]): Promise<ExchangeRate> {
  const response = await request.get({
    uri: CRYPTOCOMPARE_API_URL,
    qs: {
      fsym: tokens.join(','),
      tsyms: 'USD',
    },
    json: true,
  });
  return response;
}

function parseTransaction(data: string[]): Transaction {
  return {
    timestamp: Number(data[0]),
    transactionType: data[1] as TransactionType,
    token: data[2],
    amount: Number(data[3]),
  };
}