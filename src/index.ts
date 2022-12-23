import * as fs from 'fs'
import { TransactionType } from './enums/transaction.enum'
import { Transaction } from './interfaces/transaction.interface'
import { getExchangeRates, parseTransaction } from './utils/helper'

async function main() {
  // Read transactions from CSV file
  const csvData = fs.readFileSync(__dirname + './data/transactions.csv', 'utf-8')
  const transactions: Transaction[] = csvData
    .split('\n')
    .slice(1) 
    .map((line) => line.split(','))
    .map(parseTransaction)

  // Get exchange rates for all tokens
  const tokens = Array.from(new Set(transactions.map((t) => t.token)))
  const exchangeRates = await getExchangeRates(tokens)

  // Calculate portfolio value
  const portfolio: { [token: string]: number } = {}
  for (const transaction of transactions) {
    const valueInUSD = transaction.amount * exchangeRates[transaction.token]
    if (transaction.transactionType === TransactionType.DEPOSIT) {
      portfolio[transaction.token] =
        (portfolio[transaction.token] || 0) + valueInUSD
    } else if (transaction.transactionType === TransactionType.WITHDRAWAL) {
      portfolio[transaction.token] =
        (portfolio[transaction.token] || 0) - valueInUSD
    }
  }

  // Parse command line arguments
  const [, , ...args] = process.argv
  if (args.length === 0) {
    console.log(portfolio)
  } else if (args.length === 1) {
    const token = args[0]
    console.log(portfolio[token] || 0)
  } else if (args.length === 2) {
    const timestamp = Number(args[0])
    const token = args[1]
    let value = 0
    for (const transaction of transactions) {
      if (transaction.timestamp <= timestamp && transaction.token === token) {
        const valueInUSD = transaction.amount * exchangeRates[transaction.token]
        if (transaction.transactionType === TransactionType.DEPOSIT) {
          value += valueInUSD
        } else if (transaction.transactionType === TransactionType.WITHDRAWAL) {
          value -= valueInUSD
        }
      }
    }
    console.log(value)
  }
}

main()
