import React from 'react'

const Iframe = (props) => {
  return (
    <>
      <iframe src={props.iframe} width="100%" height="1000px" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0" title="Crypto Prediction"></iframe>
    </>
  )
}

const CryptoPrediction = () => {
  return (
    <>
      <Iframe iframe={process.env.REACT_APP_CRYPTO_PREDICTION_URL}></Iframe>
    </>
  );
}

export default CryptoPrediction
