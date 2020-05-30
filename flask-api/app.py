import os
import pandas as pd
from pytrends_extraction import fetch_dataset
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/trends/api/interest', methods=['GET'])
def get_interest():
    """
    return interest over time based on query arguments
    """
    keyword = request.args.get("keyword")
    country = request.args.get("country")

    trend = fetch_dataset(keyword, country)
    cases, deaths = fetch_covid(country)

    trend.index = trend.index.format()
    cases.index = cases.index.format()
    deaths.index = deaths.index.format()
    d = {
        "trend": trend.to_dict(),
        "cases": cases.to_dict(),
        "deaths": deaths.to_dict(),
     }
    return jsonify(d)

def fetch_covid(country):
    """
    country is formatted in ISO-2
    returns two dataframes, cases and deaths
    """
    url = "https://github.com/microsoft/Bing-COVID-19-Data/raw/master/data/Bing-COVID19-Data.csv"
    df = pd.read_csv(url)

    # set index to date and sort
    df["Updated"] = pd.to_datetime(df["Updated"])
    df = df.set_index(df["Updated"]).drop("Updated", axis=1)
    df = df.sort_index()

    # aggregate country
    df = df[df["ISO2"] == country].groupby("Updated").sum()

    return df["ConfirmedChange"], df["DeathsChange"]


if __name__ == '__main__':
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