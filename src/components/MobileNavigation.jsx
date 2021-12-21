import React from 'react'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArticleIcon from "@mui/icons-material/Article";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";


const MobileNavigation = (props) => {
  const pathName = ['/', '/cryptocurrencies', '/news', '/prediction']
  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 1, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          style={{ marginTop: "10px" }}
          showLabels
          value={pathName.indexOf(window.location.pathname)}
        >
          <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />

          <BottomNavigationAction
            label="Cryptocurrenies"
            href="/cryptocurrencies"
            icon={<MonetizationOnIcon />}
          />
          <BottomNavigationAction
            href="/news"
            label="News"
            icon={<ArticleIcon />}
          />
          <BottomNavigationAction
            label="Prediction"
            href="/prediction"
            icon={<StackedLineChartIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default MobileNavigation
