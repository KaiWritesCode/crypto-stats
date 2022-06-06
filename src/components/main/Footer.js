import React from 'react'
import '../../styles/Footer.css'

export default function NewFooter() {
    const mainFooter = (
        <footer className="footer">
            <div className='footer-wrapper'>
                <div className="footer-logo-wrapper">
                    <div className="footer-logo ">
                        <img src="/crypto-stats/images/invest-bitcoins-removebg-preview.png" width="80px" alt="" />
                        <div className='footer-title'>Crypto Stats</div>
                    </div>
                    <div className="description">Crypto Stats provides basic statistics of the cryptocurrency marketplace.
                        Crypto Stats is powered with built with React.js and Material UI.<span className="copyright">© Crypto Stats. All rights reserved</span>
                    </div>

                </div>



                <div className="ul-wrapper">
                    <div className="footer-ul">
                        <h3 className='footer-h3'>About Us</h3>
                        <ul>
                            <a href="/"><li>FAQ</li></a>
                            <a href="/"><li>Contact Me</li></a>
                            <a href="/"><li>About</li></a>
                            <a href="/"><li>Suggestions</li></a>
                        </ul>
                    </div>
                    <div className=" footer-ul">
                        <h3 className='footer-h3'>Developers</h3>
                        <ul>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.coingecko.com/en/api/documentation"><li>Coin Gecko</li></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://coinmarketcap.com/api/documentation/v1/"><li>Coin Market Cap</li></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/apis"><li>Etherscan</li></a>
                        </ul>
                    </div>
                    <div className="footer-ul">
                        <h3 className='footer-h3'>Follow Us</h3>
                        <ul>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kaiwritescode"><li>Github</li></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/kaiwritescode"><li>Twitter</li></a>
                            <a target="_blank" rel="noreferrer" href="/"><li>Discord</li></a>
                        </ul>
                    </div>
                    <div className="footer-ul">
                        <span>Stay up to date with Crypto Currency stats</span>
                        <span className='newsletter'>Join our newsletter!</span>
                        <div className="input-group">
                            <input type="text" className="footer-input" placeholder="Enter Email" />
                            <button className="btn-primary" type="button" >Join</button>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )

    // The c in class name stands for collapsed 

    const collapsedFooter = (

        <footer className="c-footer">
            <div>

                <span> © Crypto Stats. All rights reserved</span>
            </div>
            <div style={{ marginTop: '6px' }}>
                <span style={{ marginRight: '6px' }} ><a target="_blank" rel="noopener noreferrer"
                    href="https://www.coingecko.com/en/api/documentation?"> CoinGecko &#8226;</a></span>
                <span style={{ marginRight: '6px' }} ><a target="_blank" rel="noopener noreferrer"
                    href="https://etherscan.io/apis">Etherscan &#8226;</a></span>
                <span style={{ marginRight: '6px' }} ><a target="_blank" rel="noopener noreferrer"
                    href="https://coinmarketcap.com/api/documentation/v1/">CoinMarketCap &#8226;</a></span>
                <span style={{ marginRight: '6px' }} ><a target="_blank" rel="noopener noreferrer"
                    href="https://coinmarketcap.com/api/documentation/v1/">Highcharts</a></span>
            </div>
        </footer>




    )

    return (
        <>
            <div className='main-footer'>
                {mainFooter}
            </div>
            <div className='collapsed-footer'>
                {collapsedFooter}
            </div>
        </>
    );
}