import React, { useContext, useEffect } from "react";
import { TrendContext } from "../context/TrendContext";
import Loader from "./Loader";

const Search = ({ searchTerm, location }) => {
    const { chartValues, loading, runSearch } = useContext(TrendContext);
    useEffect(() => {
        runSearch(searchTerm, location);
        // eslint-disable-next-line
    });

    return (
        <div className="chart-container">
            {loading ? <Loader /> : console.log(chartValues)}
        </div>
    );
};

export default Search;
