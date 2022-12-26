## Portfolio Tracker

This command line program tracks the value of a cryptocurrency portfolio based on transactions recorded in a CSV file. It can return the latest portfolio value, filter by token or date, or combine both filters. The program uses the CryptoCompare API to obtain exchange rates for the various tokens in the portfolio.



## Installation

Clone this repository to your local machine
Bring in the CSV file into the project directory and replace the transactions.csv in the path 'src/data/transactions.csv' with it. The file seems too large to be contained in this work repository.
Navigate to the project directory and run

```bash
$ yarn
``` 
to install all the required dependencies. 

## Usage

To use the program, run the following command from the project directory:

```bash

$ yarn start [date] [token]

```

* date: Optional parameter in the format YYYY-MM-DD. If provided, the program will return the portfolio value on that date. If not provided, the latest portfolio value will be returned.
* token: Optional parameter representing a token symbol (e.g. BTC, ETH). If provided, the program will return the portfolio value for that token. If not provided, the program will return the portfolio value for all tokens.


## Testing

To run the test suite, run the following command from the project directory:

```bash

$ yarn test 

```

## Design Decisions Made

1. I chose to use the request-promise-native library to make HTTP requests to the Cryptocompare API, because it provides a simple and easy-to-use interface for making requests and handling the response.

2. I decided to implement the main function as an async function, because the getExchangeRates function makes an asynchronous API call and we need to wait for the response before we can use the exchange rates to calculate the portfolio value.

3. I used the Array.from and Set methods to deduplicate the list of tokens, because it's more efficient than using a loop or filter to remove duplicate tokens.

4. I included optional `date and token arguments in thegetPortfolioValue` function so that it can be used to calculate the portfolio value for a specific date or token, or for the entire portfolio.

## Design Principles 

1. Single Responsibility Principle: Each function has a single, well-defined purpose. For example, the getExchangeRates function is solely responsible for obtaining exchange rates from the API, while the getTransactionsFromCSV function is solely responsible for parsing the transactions from the CSV file.

2. Open-Closed Principle: The program is designed to be open for extension (e.g. adding support for new tokens or transaction types) but closed for modification (e.g. changing the implementation of existing functions).

3. Dependency Inversion Principle: The program is designed to depend on abstractions (e.g. interfaces) rather than on concrete implementations. This allows for greater flexibility and ease of testing.

4. Don't Repeat Yourself (DRY): Common functionality is abstracted into separate functions to avoid duplication of code.

