import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import '../../styles/CryptoInfo.css'
import MainNav from '../nav/MainNav'
import { FaExchangeAlt } from 'react-icons/fa'
import Chart from './Chart'
import Description from './Description'
import Footer from '../main/Footer'
import Exchanges from './Exchanges'
import News from './News'
import Trending from './Trending'

export default function CryptoInfo() {
    const [currentData, setCurrentData] = useState([])
    const [image, setImage] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
    const [marketCap, setMarketCap] = useState("")
    // const [todayHigh, setTodayHigh] = useState("")
    // const [todayLow, setTodayLow] = useState("")
    const [marketData, setMarketData] = useState([])
    const [usd, setUsd] = useState('')
    const [currency, setCurrency] = useState('')


    const { id } = useParams()

    // updates when id changes from the Trending component 
    useEffect(() => {
        const api = `https://api.coingecko.com/api/v3/coins/${id}`
        async function fetchApi() {
            try {
                const data = await fetch(api)
                const response = await data.json()
                setCurrentData(response)
                setImage(response.image.small)
                setCurrentPrice(response.market_data.current_price.usd)
                setMarketData(response.market_data)
                setMarketCap(response.market_data.market_cap.usd)
                window.scroll(0, 0)
                // setTodayHigh(response.market_data.high_24h.usd)
                // setTodayLow(response.market_data.low_24h.usd)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchApi()

    }, [id])




    const addCommas = (num) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


    const { name, symbol } = currentData
    const { circulating_supply, total_supply, price_change_percentage_24h, market_cap_rank } = marketData


    // adding commas, periods, or color to values 
    let SYMBOL = symbol && symbol.toUpperCase()
    let priceChange24h = price_change_percentage_24h && price_change_percentage_24h.toFixed(2)
    let circulatingSupply = circulating_supply && addCommas(circulating_supply.toFixed(2))
    let totalSupply = total_supply != undefined || total_supply != null ? addCommas(total_supply.toFixed(2)) : 'N/A'
    if (totalSupply === 0) {
        totalSupply = '∞'
    }
    let markettCap = marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const current_price = addCommas(currentPrice.toString())


    const currentDataDisplay = (
        <>
            <div className='top-div'>
                <div >
                    <span className='market-rank'>Rank: {market_cap_rank}</span>
                </div>
                <div className='name-div'>
                    <img className='coin-image' src={image} alt="" />
                    <span className='crypto-name'>{name}</span>
                    <span className="c-info-symbol">{SYMBOL}</span>
                </div>
            </div>
            {/* <div className='todays-range'>
                <div>
                    <progress className='progress-bar' min="0" max="0.14" value="0.1"></progress>
                </div>
                <div>
                    <span>{todayLow}</span>
                    <span>
                        -
                    </span>
                    <span> {todayHigh}</span>
                </div>
            </div> */}
            <div className='price-div'>
                <span className='current-price'>${current_price}</span>
                <span className='price-change-24' style={{ color: priceChange24h > 0 ? 'green' : 'red' }} >  {priceChange24h}  %</span>
            </div>
        </>
    )

    let marketInfo = (
        <>
            <div className='grid-box'>
                <span> Market cap rank: #{market_cap_rank}</span>
                <span> Market cap: ${markettCap}</span>
                <span> Circulating supply: {circulatingSupply}</span>
                <span> Total supply: {totalSupply}</span>
            </div>
        </>
    )

    const handleCurrency = (e) => {
        setCurrency(e.target.value)
        setUsd(parseFloat(e.target.value * currentPrice).toFixed(2))
    }
    const handleUsd = (e) => {
        setUsd(e.target.value)
        setCurrency(parseFloat(e.target.value / currentPrice).toFixed(2))
    }

    const converter = (
        <div className='converter-div'>
            <div className='convert-input'>
                <div className='prepend'>
                    <span>{SYMBOL}</span>
                </div>
                <input onChange={handleCurrency}
                    value={currency} className='input' type="number" step="1" />
            </div>

            <FaExchangeAlt className='fa-exchange' />

            <div className='convert-input'>
                <div className='prepend'>
                    <span>USD</span>
                </div>
                <input onChange={handleUsd} value={usd} className='input' type="number" step="1" />
            </div>
        </div>
    )


    return (
        <>
            <MainNav />
            <div className="crypto-info-container">
                <div className="crypto-info-top-container">
                    <div>
                        {currentDataDisplay}
                        {marketInfo}
                        {converter}
                    </div>
                    <Chart />
                </div>

                <div className='crypto-info-bottom-container'>
                    <div className='des-container'>
                        <Description symbol={SYMBOL} />
                        <Exchanges />
                    </div>
                    <News />
                </div>
                <Trending />



            </div>
            <Footer />
        </>
    )
}
