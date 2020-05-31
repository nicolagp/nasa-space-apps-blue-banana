import os
import urllib.request
import shutil
import pandas as pd
import numpy as np
from pytrends_extraction import fetch_dataset
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from sklearn.preprocessing import minmax_scale


app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/trends/api/interest": {"origins": "http://localhost:port"}})


@app.route('/trends/api/interest', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_interest():
    """
    return interest over time based on query arguments
    """
    keyword = request.args.get("keyword")
    country = request.args.get("country")

    cases, deaths, start_date, end_date = fetch_covid(country)
    trend = fetch_dataset(keyword, country, start_date, end_date)
    trend = trend.iloc[:cases.shape[0]]

    corr_cases, shift_cases = calculate_statistics(cases, trend)
    corr_deaths, shift_deaths = calculate_statistics(deaths, trend)

    trend.index = trend.index.format()
    cases.index = cases.index.format()
    deaths.index = deaths.index.format()

    # normalize data


    labels = list(trend.index)

    d = {
        "labels": labels,
        "datasets": [
                {
                    "label": "{} trends".format(keyword),
                    "data": list(100*minmax_scale(trend.values)),
                    "background": "#fff",
                    "borderColor": "rgba(255,99,132,1)",
                    "fill": "false",
                },
                { 
                    "label": "cases",
                    "data": list(100*minmax_scale(cases.values)),
                    "background": "#fff",
                    "borderColor": "#192a51",
                    "fill": "false",
                },
                {
                    "label": "deaths",
                    "data": list(100*minmax_scale(deaths.values)),
                    "background": "#fff",
                    "borderColor": "#967aa1",
                    "fill": "false",
                }
        ],
        "corr_cases": corr_cases,
        "corr_deaths": corr_deaths,
        "shift_cases": shift_cases,
        "shift_deaths": shift_deaths,
    }

    return jsonify(d)


def fetch_covid(country):
    """
    country is formatted in ISO-2
    returns two dataframes, cases and deaths
    """
    df = pd.read_csv("daily_covid.csv")

    # set index to date and sort
    df["Updated"] = pd.to_datetime(df["Updated"])
    df = df.set_index(df["Updated"]).drop("Updated", axis=1)
    df = df.sort_index()

    # aggregate country
    df = df[df["ISO2"] == country].groupby("Updated").sum()

    return df["ConfirmedChange"], df["DeathsChange"], df.iloc[0].name, df.iloc[-1].name


def calculate_statistics(data, trend):
    """
    returns correlation coefficient between time series
    """
    # calculate correlations and find best lag
    best_corr = 0
    lag = 0
    for i in range(15):
        curr = np.corrcoef(data.shift(-i).ffill(), trend)[0, 1]
        if abs(curr) > abs(best_corr):
            best_corr = curr
            lag = i

    return best_corr, lag


if __name__ == '__main__':
    url = "https://github.com/microsoft/Bing-COVID-19-Data/raw/master/data/Bing-COVID19-Data.csv"
    file_name = "daily_covid.csv"

    # update csv file
    # Download the file from `url` and save it locally under `file_name`:
    with urllib.request.urlopen(url) as response, open(file_name,
                                                       'wb') as out_file:
        shutil.copyfileobj(response, out_file)

    app.run(debug=True)
"""
{
    trend: {
        dia1: valor1,
        ...
        dian: valorn,
    },

    new_cases: {
        dia1: valor1,
        ...
        dian: valorn,
    },

    new_deaths: {
        dia1: valor1,
        ...
        dian: valorn,
    },

    day_shift_cases: (int),
    day_shift_deaths: (int),
    score_cases: (int),
    score_deaths: (int),
    correlation_cases: (float),
    correlation_deaths: (float),
}

for dia in range(0, 14):
    np.corr(df.shift(dia), df2)
"""