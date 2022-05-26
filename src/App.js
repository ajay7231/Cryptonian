import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Cryptocurrencies,
  Home,
  Navbar,
  News,
  CryptoDetails,
  CryptoPrediction,
  Backtotop,
} from "./components";
import { Layout } from "antd";
import "./App.css";
import MobileNavigation from "./components/MobileNavigation";

const App = () => {
  const isMobile = useMediaQuery("(max-width: 1060px)");
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/prediction">
                <CryptoPrediction />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
        {isMobile && <MobileNavigation/>}
      </div>
      </div>
      {!isMobile && <Backtotop/>}
    </div>
  );
};

export default App;
