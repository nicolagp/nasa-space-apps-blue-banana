from pytrends.request import TrendReq
from datetime import datetime
pytrends = TrendReq(hl='en-US', tz=360)


'''
need to build payload with keywords provided by user to return dataframe
'''
def fetch_dataset(keyword, start_date, end_date, location):
    #keywords = ["mask", "coronavirus symptoms"]

    start_date_dt = datetime.strptime(start_date, '%b %d %Y')
    end_date_dt = datetime.strptime(end_date, '%b %d %Y')

    print('keyword: %s' % keyword)
    print(type(keyword))
    print('start date: %s' % start_date_dt)
    print('end date: %s' % end_date_dt)
    print('location %s' % location)


    pytrends.build_payload(keyword,
                           cat=0,
                           timeframe='today 5-y',
                           geo=location,
                           gprop='')


    # return dataframe of interest given the keywords list
    df = pytrends.get_historical_interest(keyword,
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
    #df = df.resample('D').mean()
    df = df.round(0)

    print(df)


if __name__ == "__main__":
    keyword = ["mask"]
    start = 'May 1 2020'
    end = 'May 30 2020'
    location = ''
    fetch_dataset(keyword, start, end, location)
