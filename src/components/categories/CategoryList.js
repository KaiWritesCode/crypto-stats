import React, { useEffect, useState } from 'react'
import MainNav from '../nav/MainNav'
import Footer from '../main/Footer'
import '../../styles/Categories.css'
import CategorySkeleton from '../skeletons/CategorySkeleton'


export default function Categories() {

    const api = `https://api.coingecko.com/api/v3/coins/categories`

    const [categoryData, setCategoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetch(api)
            const response = await data.json()
            setCategoryData(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    const categoryDisplay =
        categoryData.map((item, index) => {
            const { top_3_coins, id, market_cap, market_cap_change_24h, name, volume_24h } = item
            const marketCapColor = { color: market_cap_change_24h < 0 ? '#EA3E47' : '#37b97e' }

            const marketCap = market_cap.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const newVolume = volume_24h.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const marketCapPercent = market_cap_change_24h.toFixed(2)

            const topCoins = top_3_coins.map((item) => {
                return (
                    <img src={item} alt="" />
                )
            })
            return (
                <div key={id} className='grid-styles' >
                    <span>{index + 1}</span>
                    <span>{name}</span>
                    <div>  {topCoins}</div>
                    <div className='price-change-div'>
                        <span>${marketCap}</span>
                        <span style={marketCapColor}>{marketCapPercent}%</span>
                    </div>
                    <span>${newVolume}</span>
                </div >
            )
        })

    const header = (
        <div className='category-header'>
            <span className='t-rank'>#</span>
            <span className='t-name'>Name</span>
            <span>Top 3 Coins</span>
            <span>Market Cap</span>
            <span>Volume</span>
        </div>
    )


    return (
        <>
            <MainNav />

            {isLoading ?
                <div className='category-wrapper'>
                    <CategorySkeleton />
                </div>
                :
                <div className='category-wrapper'>
                    <h2 style={{ margin: '40px 25px' }}>Highest Ranked Categories</h2>
                    {header}
                    {categoryDisplay}
                </div>
            }

            <Footer />
        </>
    )
}
