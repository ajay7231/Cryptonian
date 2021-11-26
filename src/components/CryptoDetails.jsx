import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import millify from "millify";
import {
  Grid,
  CryptoLineChart,
  Typography,
  AccountBalanceOutlinedIcon,
  MonetizationOnOutlinedIcon,
  ErrorOutlineOutlinedIcon,
  NotInterestedOutlinedIcon,
  TrendingUpOutlinedIcon,
  CheckOutlinedIcon,
  LeaderboardOutlinedIcon,
  BoltOutlinedIcon,
  Loader,
} from "../components";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { getReqPrecision } from "../services/utils";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching: isCoinDataFetching } =
    useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory, isFetching : isHistoryFetching } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod
  });

  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (isCoinDataFetching || isHistoryFetching) return <Loader/>;
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price ,{precision:getReqPrecision(cryptoDetails.price)})}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <LeaderboardOutlinedIcon /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrendingUpOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <AccountBalanceOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlinedIcon />
      ) : (
        <NotInterestedOutlinedIcon />
      ),
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
  ];

  return (
    <React.Fragment>
      <Grid item className="coin-detail-container">
        <Grid item className="coin-heading-container">
          <Typography variant="h3" className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.slug.split('-')[1]}) Price
          </Typography>
          <p>
            {cryptoDetails.name} live price in USD. View value statistics,
            market cap and supply.
          </p>
        </Grid>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((item) => (
            <Select.Option key={item} value={item}></Select.Option>
          ))}
        </Select>
        <CryptoLineChart
          coinHistory={coinHistory}
          coinName={cryptoDetails.name}
          currentPrice={millify(cryptoDetails.price, {
            precision: getReqPrecision(cryptoDetails.price),
          })}
        />
        <Grid item className="stats-container">
          <Grid item className="coin-value-statistics">
            <Grid item className="coin-value-statistics-heading">
              <Typography variant="h5" className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Typography>
              <p>
                An overview showing the statistics of {cryptoDetails.name}, such
                as the base and quote currency, the rank, and trading volume.
              </p>
            </Grid>
            {stats.map(({ icon, title, value }) => (
              <Grid item className="coin-stats">
                <Grid item className="coin-stats-name">
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                </Grid>
                <Typography variant="h6" className="stats">
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item className="other-stats-info">
            <Grid item className="coin-value-statistics-heading">
              <Typography variant="h5" className="coin-details-heading">
                Other Statistics
              </Typography>
              <p>An overview showing the statistics of all Cryptocurrencies</p>
            </Grid>
            {genericStats.map(({ icon, title, value }) => (
              <Grid item className="coin-stats">
                <Grid item className="coin-stats-name">
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                </Grid>
                <Typography variant="h6" className="stats">
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item className="coin-desc-link">
          <Grid container className="coin-desc">
            <Typography variant="h5" className="coin-details-heading">
              What is {cryptoDetails.name}?
            </Typography>
            {HTMLReactParser(cryptoDetails.description)}
          </Grid>
          <Grid item className="coin-links">
            <Typography variant="h5" className="coin-details-heading">
              {cryptoDetails.name} Links
            </Typography>
            {cryptoDetails.links?.map((link) => (
              <Grid container className="coin-link" spacing={2} key={link.name}>
                <Typography className="link-name" variant="h6">
                  {link.type}
                </Typography>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CryptoDetails;
