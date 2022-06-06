import React, { useEffect, useState } from 'react'

export default function Navbar() {
    const [marketData, setMarketData] = useState([])
    const [marketCap, setMarketCap] = useState("")
    const [gasPrice, setGasPrice] = useState("")

    const gasApi = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=IXBHG7VU8CZR6FICMDSJ3BFDEI6EJP4T7R`
    const coinMarket = `https://kaiscorsproxy.herokuapp.com/https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`
    const options = { headers: { 'X-CMC_PRO_API_KEY': '7046b5af-5836-4f47-8edd-30a9e8fe3992' } }

    async function fetchNavData() {
        const data = await fetch(coinMarket, options)
        const response = await data.json()
        setMarketData(response.data)
        setMarketCap(response.data.quote.USD.total_volume_24h)
    }
    async function fetchGasPrice() {
        const data = await fetch(gasApi)
        const response = await data.json()
        setGasPrice(response.result.SafeGasPrice)
    }
    useEffect(() => {
        fetchNavData()
        fetchGasPrice()
    }, [])

    const { active_cryptocurrencies, btc_dominance, eth_dominance } = marketData
    const btcDominance = btc_dominance !== undefined ? btc_dominance.toFixed(2) : ''
    const ethDominance = eth_dominance !== undefined ? eth_dominance.toFixed(2) : ''
    const markettCap = marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <>
            <div className='nav-container'>
                <nav className='sub-nav'>
                    <div className="nav-div">
                        <span className="nav-title">Active Cryptocurrencies: </span>
                        <span className="nav-info active-coins">{active_cryptocurrencies}</span>
                    </div>
                    <div className="nav-div">
                        <span className="nav-title">Total Volume 24hr: </span>
                        <span className="nav-info at-market-cap">${markettCap}</span>
                    </div>
                    <div className="nav-div">
                        <span className="nav-title">BTC Dominance: </span>
                        <span className="btc-dominance nav-info">{btcDominance}%</span>
                    </div>
                    <div className="nav-div">
                        <span className="nav-title">ETH Dominance: </span>
                        <span className="eth-dominance nav-info">{ethDominance} %</span>
                    </div>
                    <div className="nav-div">
                        <span className="nav-title">⛽ Gas: </span>
                        <span className="gwei nav-info">{gasPrice} gwei</span>
                    </div>
                </nav>
            </div>
        </>
    )
}
