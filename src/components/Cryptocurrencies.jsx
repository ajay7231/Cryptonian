import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { Grid } from "../components";
import { useGetCryptoCoinsQuery } from '../services/cryptoApi'
import { getReqPrecision } from "../services/utils";
import { Card,Input,Select } from "antd";
import millify from "millify";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptoCoinsQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  console.log(cryptoList);

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const filteredCryptos = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => b[sort] - a[sort]);
    // if (sort != '') {
    //   filteredCryptos.sort((a, b) => { return b[sort] - a[sort] });
    // }
    setCryptos(filteredCryptos);

  }, [cryptoList, search, sort]);

  const filters = ['relevance','price', 'marketCap', 'volume'];

  if (isFetching) return <Loader/>;
  return (
    <React.Fragment>
      {!simplified ? (
        <Grid container>
          <Grid item md={6}>
            <Select
              showSearch
              style={{ width: 200}}
              defaultValue="price"
              placeholder="Sort by"
              className="filter-by"
              onChange={(value) => setSort(value)}
            >
              {filters.map((item) => (
                <Select.Option key={item} value={item}></Select.Option>
              ))}
            </Select>
          </Grid>
          <Grid item md={6}>
            <div className="search-crypto">
              <Input
                placeholder="Search Cryptocurrencies.."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        className="crypto-card-container"
      >
        {cryptos?.map((crypto) => (
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
                <p>
                  Price: $
                  {millify(crypto.price, {
                    precision: getReqPrecision(crypto.price),
                  })}
                </p>
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
