import React, { createContext, useState } from "react";
import axios from "axios";
export const TrendContext = createContext();

const TrendContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const runSearch = (keyword, location) => {
    axios
      .get(
        `http://127.0.0.1:5000/trends/api/interest?keyword="${keyword}"&country=${location}`
      )
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };
  return (
    <TrendContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </TrendContext.Provider>
  );
};

export default TrendContextProvider;
