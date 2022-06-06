import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { Link } from 'react-router-dom'
import { TrendingSkeleton } from '../skeletons/CoinIDSkeleton'

export default function Trending() {
    const [trendingData, setTrendingData] = useState([])
    const [trendingStats, setTrendingStats] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const api = 'https://api.coingecko.com/api/v3/search/trending'

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetch(api)
            const response = await data.json()
            setTrendingData(response.coins)
        } catch (error) {
            console.log(error)
        }
    }



    let coinsArray = []
    trendingData && trendingData.forEach((item) => {
        const { id } = item.item
        coinsArray.push(id + '%2C%20')
    })



    const allIds = coinsArray.join('').replace(',', '').slice(0, -6)
    const fetchAll = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${allIds}&order=market_cap_desc&per_page=100&page=1&sparkline=true`

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const data = await fetch(fetchAll)
                const response = await data.json()
                setTrendingStats(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMarketData()
    }, [fetchAll, trendingStats])


    const trendingDivv1 = (
        trendingStats && trendingStats.slice(0, 4).map((coin, index) => {
            const { name, price_change_percentage_24h, image, id, current_price } = coin
            const sparkline = coin.sparkline_in_7d.price
            let borderColor
            let changePercent = price_change_percentage_24h.toFixed(2)

            changePercent < 0 ? borderColor = 'red' : borderColor = 'green'

            return (
                <Link key={index} to={`/assets/${id}`}>
                    <Paper className="trending-box" elevation={3}>
                        <div style={{ display: 'flex' }}>
                            <div><img style={{ borderRadius: '50%', width: '50px' }} src={image} alt="" /></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{name}</span>
                                <span>${current_price}</span>
                            </div>
                            <span style={{ color: borderColor, marginLeft: 'auto' }}>{changePercent}%</span>
                        </div>
                        <div className='trending-chart'>
                            <Sparklines data={sparkline}>
                                <SparklinesLine color={borderColor} />
                            </Sparklines>
                        </div>
                    </Paper >
                </Link>

            )
        })
    )
    const trendingDivv2 = (
        trendingStats && trendingStats.slice(4, 8).map((coin, index) => {
            const { name, price_change_percentage_24h, image, id, current_price } = coin
            const sparkline = coin.sparkline_in_7d.price
            let borderColor
            let changePercent = price_change_percentage_24h.toFixed(2)

            changePercent < 0 ? borderColor = 'red' : borderColor = 'green'

            return (
                <Link key={index} to={`/assets/${id}`}>
                    <Paper className="trending-box" elevation={3}>
                        <div style={{ display: 'flex' }}>
                            <div><img style={{ borderRadius: '50%', width: '50px', height: '50px' }} src={image} alt="" /></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span> {name}</span>
                                <span>${current_price}</span>
                            </div>
                            <span style={{ color: borderColor, marginLeft: 'auto' }}>{changePercent}%</span>
                        </div>
                        <div className='trending-chart'>
                            <Sparklines data={sparkline}>
                                <SparklinesLine color={borderColor} />
                            </Sparklines>
                        </div>
                    </Paper >
                </Link >

            )
        })
    )



    return (
        <>
            {
                isLoading ? <TrendingSkeleton /> :

                    <div className='trending-div'>
                        <h1 style={{ margin: '20px 0' }}>Trending Coins 🔥</h1>
                        <div className='trending-coins-div'>
                            <div className='trending-flex-box'>
                                {trendingDivv1}
                            </div>
                            <div className='trending-flex-box'>
                                {trendingDivv2}
                                <a href={'/'}>
                                    <div className="trending-box trending-image" >
                                        <h2 style={{ color: 'white', fontWeight: '700', fontSize: '1.5em', verticalAlign: 'center' }}>See More Coins</h2>
                                    </div >
                                </a>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}



