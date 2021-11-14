import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Grid } from "../components";
import { useGetCryptoCoinsQuery } from '../services/cryptoApi'
import { Card } from "antd";
import millify from "millify";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptoCoinsQuery(count);
  const [cryptos, setCrypto] = useState([]);
  console.log(cryptoList);
  if (isFetching) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        className="crypto-card-container"
      >
        {cryptoList?.data?.coins.map((crypto) => (
          <Grid
            item
            key={crypto.id}
            xs={12}
            sm={6}
            lg={3}
            className="crypto-card"
          >
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={crypto.iconUrl}
                    alt="crypto news"
                  />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Cryptocurrencies;
