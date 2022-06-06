import React, { useEffect, useState } from 'react'



export default function Description({ symbol }) {


    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [tags, setTags] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            const api = `https://kaiscorsproxy.herokuapp.com/https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`
            const apiKey = { headers: { 'X-CMC_PRO_API_KEY': '7046b5af-5836-4f47-8edd-30a9e8fe3992' } }
            try {
                const data = await fetch(api, apiKey)
                const response = await data.json()
                setName(response.data[symbol][0].name)
                setDescription(response.data[symbol][0].description)
                setTags(response.data[symbol][0]["tag-names"])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [symbol])






    const descriptionDiv = (
        <div className="padding-container">
            <div>
                <h1>{name && (<div>{name}  Description</div>)}</h1>
                <div className="description-div"> {description}</div>
            </div>

            <div className='badge-container'>
                {tags && tags.slice(0, 10).map((item, ind) => {
                    return (
                        <div key={ind} className='tag-badge'>{item}</div>
                    )
                })}
            </div>
        </div>
    )



    return (
        <>

            {descriptionDiv}

        </>
    )
}
