from pytrends.request import TrendReq
pytrends = TrendReq(hl='en-US', tz=360)
from datetime import datetime



def fetch_dataset(keyword, location, start_date, end_date):
    '''
    need to build payload with keywords provided by user to return dataframe
    '''
    key_list = [keyword]
    # start_date_dt = datetime.strptime("Jan 21 2020", '%b %d %Y')
    start_date_dt=start_date
    #end_date_dt = datetime.now()
    #end_date_dt = datetime.strptime("May 30 2020", '%b %d %Y')
    end_date_dt = end_date

    # pytrends.build_payload(key_list,
    #                        cat=0,
    #                        timeframe='today 5-m',
    #                        geo=location,
    #                        gprop='')


    # return dataframe of interest given the keywords list
    df = pytrends.get_historical_interest(key_list,
                                year_start= start_date_dt.year,
                                month_start= start_date_dt.month,
                                day_start= start_date_dt.day,
                                hour_start= start_date_dt.hour,
                                year_end= end_date_dt.year,
                                month_end= end_date_dt.month,
                                day_end= end_date_dt.day,
                                hour_end= end_date_dt.hour,
                                cat=0,
                                geo=location,
                                gprop='',
                                sleep=0)

    # take hourly data and convert into average daily data
    print("AFTER REQUEST")
    print("Payload: ", keyword, start_date_dt, end_date_dt)
    print(df)
    df = df.iloc[::24]
    df = df.round(0)
    df[keyword] = df[keyword].replace(to_replace=0, method='ffill')

    return df[keyword]


if __name__ == "__main__":
    keyword = "cars"
    start = 'May 1 2020'
    end = 'May 30 2020'
    location = ''
    fetch_dataset(keyword, location)
