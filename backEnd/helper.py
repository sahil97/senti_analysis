# Imports

import tweepy
import pandas as pd
import numpy as np
import datetime
import os


try:
    import seed
except:
    print("using OS variables")


try:
    # Config Variables
    ACCESS_TOKEN = os.environ['ACCESS_TOKEN']
    ACCESS_SECRET = os.environ['ACCESS_SECRET']
    CONSUMER_KEY = os.environ['CONSUMER_KEY']
    CONSUMER_SECRET = os.environ['CONSUMER_SECRET']
except:
    print("Secret Key errors")

# Config Variables
columns = ['created_at', 'coordinates','text']

def limit_handled(cursor):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            print("rate limit reached")
            time.sleep(15 * 60)

def get_tweets(hashtag, count):

    retrieved_tweets = pd.DataFrame(columns = columns)

#     Temperory Variables
    created_at = []
    coordinates = []
    tweets_text = []
    total_retweets = 0
    counter = 0

#     Auth
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
    api = tweepy.API(auth,wait_on_rate_limit=False)



    for tweet in limit_handled(tweepy.Cursor(api.search,q="#India",lang="en",
                               since="2017-04-03").items(count)):

        if((len(tweets_text)>0) and (tweet.text == tweets_text[-1])):
            counter += 1
            continue

        elif(len(tweets_text)<count):

#         Checking for retweet
            if tweet.text.startswith("RT @") == True:
                total_retweets += 1

#         Storing coordinates of the tweet if enabled by the user

            if(tweet.coordinates):
                coordinates.append(tweet.coordinates)
            elif(tweet.geo):
                coordinates.append(tweet.geo)
            else:
                coordinates.append(np.nan)

            tweets_text.append(tweet.text)
            created_at.append(tweet.created_at)
            counter += 1


        elif(len(tweets_text)>count):
            counter += 1
            break


    retrieved_tweets['created_at'] = created_at
    retrieved_tweets['coordinates'] = coordinates
    retrieved_tweets['text'] = tweets_text
    print("Counter = ", counter)
    return retrieved_tweets, total_retweets

def roundTime(dt=None, hours=0, minutes=1):

    dateDelta=datetime.timedelta(hours=hours,minutes=minutes)
    """Round a datetime object to a multiple of a timedelta
    dt : datetime.datetime object, default now.
    dateDelta : timedelta object, we round to a multiple of this, default 1 minute.
    Author: Thierry Husson 2012 - Use it as you want but don't blame me.
            Stijn Nevens 2014 - Changed to use only datetime objects as variables
    """
    roundTo = dateDelta.total_seconds()
    if dt == None :
        dt = datetime.datetime.now()
    dtmin = datetime.datetime(2012,12,31,00,00,00)
    seconds = (dt - dtmin).seconds
#     // is a floor division, not a comment on following line:
    rounding = (seconds+roundTo/2) // roundTo * roundTo
    return dt + datetime.timedelta(0,rounding-seconds,-dt.microsecond)

def groupByTime(data_frame, column_name):
    time_pairs = [[0,1],[0,5],[0,10],[0,15],[0,30],[1,0],[1,15],[1,30],[1,45],[2,0],[3,0],[4,0]]
    time_groups = np.inf
    i=0
    time_grouped_column_name = 'grouped_time'

#     Checking if type is of type DateTime
    if(data_frame[column_name].dtype != '<M8[ns]'):
        data_frame[column_name] = data_frame[column_name].apply(lambda x: datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S') )

    while (time_groups>=10 and i<len(time_pairs)):
        hours, minutes = time_pairs[i]
        data_frame[time_grouped_column_name] = data_frame[column_name].apply(lambda x: roundTime(dt=x, hours = hours, minutes = minutes))
        time_groups = len(data_frame[time_grouped_column_name].value_counts())
        i += 1

    return data_frame, time_grouped_column_name

def return_time_count(data_frame, column_name):

    values = data_frame[column_name].value_counts().keys().tolist()
    counts = data_frame[column_name].value_counts().tolist()

    time_count = []

    for time, count in zip(values, counts):
        time_count.append({
            "time": time,
            "count": count
        })

    return time_count
