import React, { useContext, useEffect } from "react";
import { TrendContext } from "../context/TrendContext";
import Loader from "./Loader";

const Container = ({ searchTerm, location }) => {
  const { images, loading, runSearch } = useContext(TrendContext);
  useEffect(() => {
    runSearch(searchTerm, location);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className="container">
      {loading ? <Loader /> : console.log(images)}
    </div>
  );
};

export default Container;
