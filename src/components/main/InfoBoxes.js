import React, { useState, useEffect } from "react";
import "../../styles/InfoBox.css";

export default function InfoBoxes() {
  const [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  async function fetchCategoriesApi() {
    try {
      const data = await fetch(categoriesApi);
      const response = await data.json();
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategoriesApi();
  }, []);

  const categoriesApi = `https://api.coingecko.com/api/v3/coins/categories`;

  const highest = data.reduce(
    (a, b) => {
      return b.market_cap_change_24h > a.market_cap_change_24h ? b : a;
    },
    { market_cap_change_24h: 0 }
  );

  const lowest = data.reduce(
    (a, b) => {
      return b.market_cap_change_24h > a.market_cap_change_24h ? a : b;
    },
    { market_cap_change_24h: 0 }
  );

  const highestVol = data.reduce(
    (a, b) => {
      return b.volume_24h > a.volume_24h ? b : a;
    },
    { volume_24h: 0 }
  );

  const highestMarketCap = data.reduce(
    (a, b) => {
      return b.market_cap > a.market_cap ? b : a;
    },
    { market_cap: 0 }
  );

  const highestMCPercentDiv = (
    <div className="info-box highest-mc-box">
      <div>
        <div className="info-name">{highest.name}</div>
        <div
          style={{ color: highest.market_cap_change_24h > 0 ? "green" : "red" }}
          className="info-change"
        >
          {highest.market_cap_change_24h &&
            highest.market_cap_change_24h.toFixed(2)}{" "}
          %
        </div>
      </div>
      <div className="info-coin-container flex-center">
        {highest.top_3_coins &&
          highest.top_3_coins.map((item) => {
            return <img src={item} alt="" />;
          })}
      </div>
      <div className="info-desc">Top Category Gainer</div>
    </div>
  );

  const lowestMCDiv = (
    <div className="info-box lowest-mc-box">
      <div>
        <div className="info-name">{lowest.name}</div>
        <div
          style={{ color: lowest.market_cap_change_24h > 0 ? "green" : "red" }}
          className="info-change"
        >
          {lowest.market_cap_change_24h &&
            lowest.market_cap_change_24h.toFixed(2)}{" "}
          %
        </div>
      </div>
      <div className="info-coin-container flex-center">
        {lowest.top_3_coins &&
          lowest.top_3_coins.map((item) => {
            return <img src={item} alt="" />;
          })}
      </div>
      <div className="info-desc">Top Category Loss</div>
    </div>
  );

  const highestVolDiv = (
    <div className="info-box highestVol-mc-box">
      <div>
        <div className="info-name">{highestVol.name}</div>
        <div className="info-price">
          $
          {highestVol.volume_24h &&
            highestVol.volume_24h
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div className="info-coin-container flex-center">
        {highestVol.top_3_coins &&
          highestVol.top_3_coins.map((item) => {
            return <img src={item} alt="" />;
          })}
      </div>
      <div className="info-desc">Top Volume Today</div>
    </div>
  );

  const highestMCDiv = (
    <div className="info-box highestVol-mc-box">
      <div>
        <div className="info-name">{highestMarketCap.name}</div>
        <div className="info-price">
          $
          {highestMarketCap.volume_24h &&
            highestMarketCap.market_cap
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div className="info-coin-container flex-center">
        {highestMarketCap.top_3_coins &&
          highestMarketCap.top_3_coins.map((item) => {
            return <img src={item} alt="" />;
          })}
      </div>
      <div className="info-desc">Top Market cap Today</div>
    </div>
  );

  return (
    <div className="info-container">
      {!isLoading ? highestMCPercentDiv : null}
      {!isLoading ? lowestMCDiv : null}
      {!isLoading ? highestVolDiv : null}
      {!isLoading ? highestMCDiv : null}
    </div>
  );
}
