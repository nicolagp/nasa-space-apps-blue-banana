import React, { createContext, useState } from "react";
import axios from "axios";
export const TrendContext = createContext();

const BASE_URI = 'http://127.0.0.1:5000';

const client = axios.create({
    baseURL: BASE_URI
});

const TrendContextProvider = props => {
    const [chartValues, setChartValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const runSearch = (keyword, location) => {
        client({
            method: 'get',
            url: `/trends/api/interest?keyword="${keyword}"&country=${location}`
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(
                    "Encountered an error with fetching and parsing data",
                    error
                );
            })
    };
    return (
        <TrendContext.Provider value={{ chartValues, loading, runSearch }}>
            {props.children}
        </TrendContext.Provider>
    );
};

export default TrendContextProvider;

/*
"trend": trend.to_dict(),
"cases": cases.to_dict(),
"deaths": deaths.to_dict(),
"corr_cases": corr_cases,
"corr_deaths": corr_deaths,
"shift_cases": shift_cases,
"shift_deaths": shift_deaths,
*/
