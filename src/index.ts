import * as fs from 'fs'
import {
  getExchangeRates,
  getTransactionsFromCSV,
  getPortfolioValue,
} from './utils/helper'

async function main() {
  const args = process.argv.slice(2)
  const csv = fs.readFileSync(__dirname + '/data/transactions.csv', 'utf-8')
  const transactions = getTransactionsFromCSV(csv)
  const tokens = Array.from(new Set(transactions.map((t) => t.token)))
  const exchangeRates = await getExchangeRates(tokens)
  let portfolio
  if (args.length === 0) {
    // No parameters, return the latest portfolio value per token in USD
    portfolio = getPortfolioValue(transactions, exchangeRates)
  } else if (args.length === 1) {
    const arg = args[0]
    if (isNaN(parseInt(arg, 10))) {
      // A single string argument, assume it's a token symbol and return the latest portfolio value for that token in USD
      portfolio = getPortfolioValue(transactions, exchangeRates, undefined, arg)
    } else {
      // A single numerical argument, assume it's a timestamp and return the portfolio value per token in USD on that date
      portfolio = getPortfolioValue(
        transactions,
        exchangeRates,
        parseInt(arg, 10),
      )
    }
  } else if (args.length === 2) {
    // Two arguments, assume the first is a timestamp and the second is a token symbol
    // Return the portfolio value of that token in USD on that date
    portfolio = getPortfolioValue(
      transactions,
      exchangeRates,
      parseInt(args[0], 10),
      args[1],
    )
  }

  console.log(portfolio)
}

main()
