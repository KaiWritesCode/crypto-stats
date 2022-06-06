import React, { useEffect, useState } from 'react'



export default function FinancePlatforms() {

    const api = `https://api.coingecko.com/api/v3/exchanges?per_page=10`

    const [platformList, setPlatformList] = useState([])


    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const data = await fetch(api)
            const response = await data.json()
            setPlatformList(response)
        } catch (error) {
            console.log(error)
        }
    }

    const platformStyle = {
        borderBottom: '1px solid #DFE2E7', gridTemplateColumns: '.5fr 1fr 2fr 2fr',
        display: 'grid', marginRight: '20px', padding: '12px 0', alignItems: 'center'
    }

    const platformDiv = (
        platformList.map((item) => {
            const { name, trust_score_rank, image, url } = item
            return (
                <div key={name} style={platformStyle}>
                    <div style={{ fontSize: '1.2rem' }}>{trust_score_rank}</div>
                    <img src={image} alt="" />
                    <div>{name}</div>
                    <a style={{ color: '#011577' }} href={url} target="_blank" rel="noreferrer"><div>{url}</div></a>
                </div>

            )
        })
    )

    return (
        <div className='padding-container exchanges-container'>

            <h1 style={{ margin: '10px 0' }}>Exchanges</h1>
            {platformDiv}
        </div>
    )
}
