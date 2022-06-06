import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box, Tab, Tabs } from '@mui/material'
import { NewsSkeleton, TripleNewsSkeleton } from '../skeletons/CoinIDSkeleton'


export default function News() {
    const [articleSource, setArticleSource] = useState("cryptonews.com")
    const [newsArray, setNewsArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)




    const newsImages = ["https://images.unsplash.com/photo-1617854607064-18337ca0a680?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1611281929181-da7cf871df4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1621264437251-59d700cfb327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1518483239595-6f1f9e80b7c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1620778182530-703effa65a06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1609554497580-f7f3443af6ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1631689493627-b8745c86bd94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1625726124021-feb7ec3f281b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", "https://images.unsplash.com/photo-1617875119001-7b8ed8effb1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1640772394674-47edbc52659d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1640229859880-3f6eff9e7364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1624953187665-7d41d0ade16e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "https://images.unsplash.com/photo-1638913971873-bcef634bdcd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"]
    const newsApi = `https://crypto-news-live3.p.rapidapi.com/news/${articleSource}`
    const options = {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
            'X-RapidAPI-Key': '27b75a3147msh07900745f4edceep15fcb0jsn727c84d5ae66'
        }
    }

    useEffect(() => {
        fetchNews()
    }, [articleSource])

    const fetchNews = async () => {
        try {
            const data = await fetch(newsApi, options)
            const response = await data.json()
            console.log(response)
            setNewsArray(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const [value, setValue] = React.useState(0);

    const handleChange = async (event, newValue) => {
        const data = newValue
        setValue(data);
        setArticleSource(event.target.name)
    };

    const newsDiv = (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab name="coindesk.com" label="Coin Desk" {...a11yProps(0)} />
                    <Tab name="cryptonews.com" label="CryptoNews" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {/* <div className="tabs-container">
                {newsArray && newsArray.slice(0, 3).map((item, index) => {
                    const { source, title, url } = item
                    return (
                        <TabPanel key={index} value={value} index={0}>
                            {source !== 'coindesk.com' ? <NewsSkeleton /> : <div key={index} className='news-div'>
                                <a target="_blank" rel="noreferrer" href={url}>
                                    <img src={newsImages[index]} alt="" />
                                    <h3>{title}</h3>
                                    <div>Source: {source}</div>
                                </a>
                            </div>}
                        </TabPanel>
                    )
                })
                }
            </div> */}

            <div className="tabs-container">
                {newsArray.slice(0, 3).map((item, index) => {
                    const { source, title, url } = item
                    return (
                        <TabPanel value={value} key={index} index={0}>
                            {source !== 'cryptonews.com' ? <NewsSkeleton /> : <div key={index} className='news-div'>
                                <a target="_blank" rel="noreferrer" href={url}>
                                    <img src={newsImages[index]} alt="" />
                                    <h3>{title}</h3>
                                    <div>Source: {source}</div>
                                </a>
                            </div>}
                        </TabPanel>
                    )
                })}
            </div>

            <div className="tabs-container">
                {newsArray.slice(0, 3).map((item, index) => {
                    const { source, title, url } = item
                    return (
                        <TabPanel value={value} key={index} index={1}>
                            {source !== 'cryptonews.com' ? <NewsSkeleton /> : <div key={index} className='news-div'>
                                <a target="_blank" rel="noreferrer" href={url}>
                                    <img src={newsImages[index + 3]} alt="" />
                                    <h3>{title}</h3>
                                    <div>Source: {source}</div>
                                </a>
                            </div>}
                        </TabPanel>
                    )
                })}
            </div>
        </Box>
    );
    return (

        <div className='news-container'>
            <h1 style={{ margin: '10px 0' }}>Latest Crypto News</h1>
            {isLoading ? <TripleNewsSkeleton /> : newsDiv}
        </div>


    )

}

