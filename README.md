# Crypto Stats
## Find all the information on Cryptocurrencies
<img width="1425" alt="Cryptostats" src="https://user-images.githubusercontent.com/84258692/158239078-efeb8aea-a1f3-44ba-9f78-3517c611300a.png">


## Crypto-Stats is a web app that displays information on the Cryptocurrency market.


## Features:
1. Charts
2. Market Caps
3. Percent Changes
4. BTC & ETH Dominance 
5. Volume
6. Currency Converter
7. Current Price


## Built With: 
1. React.js
2. React Router
3. CSS 

## Apis Used: 
1. [Coin Gecko](https://www.coingecko.com/en/api/documentation) 
2. [Etherscan](https://etherscan.io/apis)
3. [CoinMarketCap](https://coinmarketcap.com/api/)
4. [Highcharts](https://www.highcharts.com/)


## Challenges I faced: 
I had issues dealing with routing and the `useParams()` function, the question can be seen here on [stackoverflow](https://stackoverflow.com/questions/71686041/react-router-link-changes-url-but-doesnt-render-the-component). Another challenge I had to deal with was getting the price action chart to display information the correct way. I wanted to show just the price and not the date, however it was difficult to Highcharts API and try to modify the values. 

## What I learned: 
- I learned how to filter the API data and only display the search term. I had to set an `inputValue` to the `e.target.value` and used the filter method to filter the array of Crytpocurrencies and return the mapped values based the the filter variable `var`
- I strengethed my conditional rendering with comparisons. When displaying the if the percetage changes were red or green, I had to compare the values to see if they were less than or equal to 0. Based off of that, I gave the percentage changes their correct `className` which had the proper color.
- Adding try catches to my async functions.

## Future plans: 
- I plan to add a way to keep track of your favorite Crypto by adding a star on each one. 
- Hold more cryptocurrencies in the app with a paid coingecko plan.
- Light and dark mode toggle.

## Contact me:
This is one of my favorite projects to date that I check frequently for my own crypto info.
If you have any suggestions or feedback, I would love to hear from you please contact me at: 
- kbechdel8@gmail.com
- [Github](https://github.com/kaiwritescode)
- [Twitter](https://twitter.com/kaiwritescode)
