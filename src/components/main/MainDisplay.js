import React, { useEffect, useState } from 'react'
import '../../styles/App.css';
import { Link } from 'react-router-dom'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import MainSkeleton from '../skeletons/MainSkeleton'


export default function MainDisplay({ inputValue }) {
    const [listData, setListData] = useState([])
    const [showPages, setShowPages] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    // changes page number from pagination MUI component 
    const [pageNum, setPageNum] = useState(1)
    const changePage = (event, index) => {
        setPageNum(index)
        setShowPages(false)
        setIsLoading(true)
        window.scroll(0, 0)
    }

    // fetch api based on page number 
    useEffect(() => {
        fetchApi()
    }, [pageNum])


    async function fetchApi() {
        try {
            const data = await fetch(api)
            const response = await data.json()
            setListData(response)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }


    //    Allows user to see all results rather than being restricted by pagination data 
    useEffect(() => {
        inputValue !== undefined || inputValue !== null ? setShowPages(true) : setShowPages(false)
    }, [inputValue])



    // show pages will show maximum amount of data, if the user enters an input value in the search bar 
    const api =
        showPages ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=true&price_change_percentage=7d%2C30d`
            : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNum}&sparkline=true&price_change_percentage=7d%2C30d`




    const topRow = (
        <div>
            <div className="top-row">
                <span className="t-rank">#</span>
                <span className="t-name">Name</span>
                <span className="t-price">Price</span>
                <div className='percent-div'>
                    <span className="t-change">24h</span>
                    <span className="t-change">7d</span>
                    <span className="t-change">30d</span>
                </div>
                <span className="t-market-cap">Market Cap</span>
                <span className="t-spark-line">Trend</span>
            </div>
            <div className="example">
                <ol className="ordered-list">
                </ol>
            </div>
        </div>
    )



    // search filter, inputValue is taken from Mainnav component (passed through App.js)
    const coins = (
        listData.filter((val) => {
            if (inputValue === "") {
                return val
            } else if (val.name.toLowerCase().includes(inputValue.toLowerCase())) {
                return val
            } else if (val.symbol.toLowerCase().includes(inputValue.toLowerCase())) {
                return val
            }
        }).map((item) => {
            const { market_cap_rank, image, symbol, name, current_price,
                price_change_percentage_24h, market_cap, sparkline_in_7d, id,
                price_change_percentage_7d_in_currency, price_change_percentage_30d_in_currency } = item
            const chart = sparkline_in_7d.price
            let borderColor

            price_change_percentage_24h < 0 ? borderColor = 'red' : borderColor = 'green'

            const currentPrice = current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const priceChange = price_change_percentage_24h && price_change_percentage_24h.toFixed(2)
            const priceChange7d = price_change_percentage_7d_in_currency && price_change_percentage_7d_in_currency.toFixed(2)
            const priceChange30d = price_change_percentage_30d_in_currency && price_change_percentage_30d_in_currency.toFixed(2)
            const SYMBOL = symbol.toUpperCase()
            const marketCap = market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")




            return (

                <ol key={name} className="ordered-list">
                    <li className="row-li">
                        <span className="rank">{market_cap_rank}</span>
                        <div className="img-name">
                            <img className="coin-img test" src={image} alt="" />
                            <Link to={`/assets/${id}`}>
                                <div className="name-symbol">
                                    <span className="name">{name}</span>
                                    <span className="symbol">{SYMBOL}</span>
                                </div>
                            </Link>

                        </div>
                        <span className="price">${currentPrice}</span>
                        <div className='percent-div'>
                            <span className={priceChange > 0 ? 'percent-change-green' : 'percent-change-red'}>
                                {priceChange} %</span>
                            <span className={priceChange7d > 0 ? 'percent-change-green' : 'percent-change-red'}>
                                {priceChange7d} %</span>
                            <span className={priceChange30d > 0 ? 'percent-change-green' : 'percent-change-red'}>
                                {priceChange30d} %</span>
                        </div>
                        <span className="market-cap">${marketCap}</span>
                        <Link className='graph-link' to={`/assets/${id}`}>
                            <Sparklines data={chart}>
                                <SparklinesLine color={borderColor} />
                            </Sparklines>
                        </Link>
                    </li>
                </ol>
            )
        })
    )


    return (
        <>
            <div className="container">
                {isLoading ?
                    <div className="skeleton-container">
                        <MainSkeleton />
                    </div>
                    :
                    <div className="main-section">
                        {topRow}
                        {coins}
                    </div>}


                {/* pagination from MUI  */}
                <Stack className='flex-center' spacing={2}>
                    <Pagination
                        page={pageNum}
                        onChange={changePage}
                        count={10} variant="outlined"
                        size='large'
                    />
                </Stack>
            </div>
        </>
    )
}
