import React from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Grid,Typography,Loader } from "../components";
import { Card , Avatar } from "antd";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const count = simplified ? 6 : 21;
  const newsCategory = "Cryptocurrency";
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  if (!cryptoNews?.value || isFetching) return <Loader />;

  return (
    <React.Fragment>
      <Grid container columnSpacing={4} rowSpacing={4} className="news-container">
        {cryptoNews.value.map((news,index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card hoverable>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Typography className="news-title" level={5}>
                    {news.name}
                  </Typography>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p style={{ color: "black" }}>
                  {news.description > 100
                    ? news.description.substring(0, 100) + "..."
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <p className="provider-name">
                      {news.provider[0]?.name}
                    </p>
                  </div>
                  <p>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </p>
                </div>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default News;
