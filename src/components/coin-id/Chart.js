import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../../styles/CryptoInfo.css";
import { useParams } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";

export default function Chart() {
  const [currentData, setCurrentData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [chartPrice, setChartPrice] = useState([]);
  const [days, setDays] = useState(1);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const { id } = useParams();
  const chartApi = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const api = `https://api.coingecko.com/api/v3/coins/${id}`;

  async function fetchChartData() {
    try {
      const data = await fetch(chartApi);
      const response = await data.json();
      setChartPrice(response.prices);
    } catch (error) {
      console.log(error)
    }

  }

  async function fetchApi() {
    try {
      const data = await fetch(api);
      const response = await data.json();
      setMarketData(response.market_data);
      setCurrentData(response);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    fetchApi();
    fetchChartData();
  }, [days, id]);

  const chartStats = chartPrice.map((item) => {
    let arr = [];
    arr.push(item[0]);
    arr.push(Number(item[1].toFixed(2)));
    return arr;
  });

  const {
    price_change_percentage_24h,
    price_change_percentage_1y,
    price_change_percentage_7d,
    price_change_percentage_30d,
  } = marketData;
  const { name } = currentData;

  let priceChange24h =
    price_change_percentage_24h && price_change_percentage_24h.toFixed(2);
  let priceChange7d =
    price_change_percentage_7d && price_change_percentage_7d.toFixed(2);
  let priceChange30d =
    price_change_percentage_30d && price_change_percentage_30d.toFixed(2);
  let priceChange1y =
    price_change_percentage_1y && price_change_percentage_1y.toFixed(2);

  Highcharts.dateFormat("Month: %m Day: %d Year: %Y", 20, false);

  const options = {
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 200,
          },
        },
      ],
    },
    chart: {
      zoomType: "x",
    },
    title: {
      text: `${name} price chart`,
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
    },
    xAxis: {
      type: "datetime",
      minTickInterval: 24,
    },
    dataGrouping: {
      enabled: false,
    },
    yAxis: {
      type: "linear",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "Price",
        data: chartStats,
      },
    ],
  };

  function handle1d() {
    setDays(1);
    removeAll();
    setActive1(true);
  }
  function handle7d() {
    setDays(7);
    removeAll();
    setActive2(true);
  }
  function handle1m() {
    setDays(30);
    removeAll();
    setActive3(true);
  }
  function handle1y() {
    setDays(365);
    removeAll();
    setActive4(true);
  }
  function removeAll() {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
  }

  const chartInfo = (
    <div style={{ marginTop: "12px" }}>
      <div
        style={{
          display: days === 1 ? "block" : "none",
          color: priceChange24h > 0 ? "green" : "red",
        }}
        className="percent-change-display"
      >
        <span style={{ display: priceChange24h > 0 ? "inline" : "none" }}>
          +
        </span>
        {priceChange24h}%
      </div>
      <div
        style={{
          display: days === 7 ? "block" : "none",
          color: priceChange7d > 0 ? "green" : "red",
        }}
        className="percent-change-display"
      >
        <span style={{ display: priceChange7d > 0 ? "inline" : "none" }}>
          +
        </span>
        {priceChange7d}%
      </div>
      <div
        style={{
          display: days === 30 ? "block" : "none",
          color: priceChange30d > 0 ? "green" : "red",
        }}
        className="percent-change-display"
      >
        <span style={{ display: priceChange30d > 0 ? "inline" : "none" }}>
          +
        </span>
        {priceChange30d}%
      </div>
      <div
        style={{
          display: days === 365 ? "block" : "none",
          color: priceChange1y > 0 ? "green" : "red",
        }}
        className="percent-change-display"
      >
        <span style={{ display: priceChange1y > 0 ? "inline" : "none" }}>
          +
        </span>
        {priceChange1y}%
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            className={`${active1 ? "active-btn" : null}`}
            onClick={handle1d}
          >
            1d
          </Button>
          <Button
            className={`${active2 ? "active-btn" : null}`}
            onClick={handle7d}
          >
            7d
          </Button>
          <Button
            className={`${active3 ? "active-btn" : null}`}
            onClick={handle1m}
          >
            1m
          </Button>
          <Button
            className={`${active4 ? "active-btn" : null}`}
            onClick={handle1y}
          >
            1y
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );

  return (
    <div className="chart-container">
      <div className="inner-chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      {chartInfo}
    </div>
  );
}
