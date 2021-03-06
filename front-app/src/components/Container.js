import React, { useContext, useEffect } from "react";
import { TrendContext } from "../context/TrendContext";
import Loader from "./Loader";
import { Line } from 'react-chartjs-2';


const Container = ({ searchTerm, location }) => {
  const { images, loading, runSearch } = useContext(TrendContext);
  useEffect(() => {
    runSearch(searchTerm, location);
    // eslint-disable-next-line
  }, [searchTerm, location]);

  return (
    <div className="container">
      {loading ? <Loader /> :
        <div>
          <Line
            data={images[0]}
            options={{}}
          />
          <Line
            data={images[1]}
            options={{}}
          />
        </div>
      }
    </div>
  );
};

export default Container;
