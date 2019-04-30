import tweepy
import nltk
import string
nltk.download('stopwords')
nltk.download('wordnet')
import re
import os

# data analysis and wrangling
import pandas as pd
import numpy as np
import random as rnd
from sklearn import feature_extraction, model_selection, naive_bayes, metrics, svm
import datetime

# visualization
import seaborn as sns
import matplotlib.dates as dt
import matplotlib.pyplot as plt

# machine learning
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC, LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import Perceptron
from sklearn.linear_model import SGDClassifier
from sklearn.tree import DecisionTreeClassifier

#comparing
from sklearn.model_selection import cross_val_score


# Config Variables
ACCESS_TOKEN = os.environ['ACCESS_TOKEN']
ACCESS_SECRET = os.environ['ACCESS_SECRET']
CONSUMER_KEY = os.environ['CONSUMER_KEY']
CONSUMER_SECRET = os.environ['CONSUMER_SECRET']

def remove_punct(text):
    text  = "".join([char for char in text if char not in string.punctuation])
    text = re.sub('[0-9]+', '', text)
    return text

def tokenization(text):
    text = re.split('\W+', text)
    return text

stopword = nltk.corpus.stopwords.words('english')

def remove_stopwords(text):
    text = [word for word in text if word not in stopword]
    return text

ps = nltk.PorterStemmer()

def stemming(text):
    text = [ps.stem(word) for word in text]
    return text


wn = nltk.WordNetLemmatizer()

def lemmatizer(text):
    text = [wn.lemmatize(word) for word in text]
    return text


def round_to_hour(dt):
    dt_start_of_hour = dt.replace(minute=0, second=0, microsecond=0)
    dt_half_hour = dt.replace(minute=30, second=0, microsecond=0)

    if dt >= dt_half_hour:
        # round up
        dt = dt_start_of_hour + datetime.timedelta(hours=1)
    else:
        # round down
        dt = dt_start_of_hour

    return dt


def clean_text(text):
    text_lc = "".join([word.lower() for word in text if word not in string.punctuation]) # remove puntuation
    text_rc = re.sub('[0-9]+', '', text_lc)
    tokens = re.split('\W+', text_rc)    # tokenization
    text = [ps.stem(word) for word in tokens if word not in stopword]  # remove stopwords and stemming
    return text



def load_tweets(hashtag,count):
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)
    df = pd.DataFrame(columns=['time','tweet'])
    time = []
    tweets = []
    for tweet in tweepy.Cursor(api.search,q="#"+hashtag,count=count,lang="en",since="2019-04-03").items(count):
        if(len(tweets)>0 and tweet.text == tweets[-1]):
            continue
        time.append(tweet.created_at)
        tweets.append(tweet.text)
    df['time'] = time
    df['tweet'] = tweets
    return df




def spit_results(df,vec,model):
    df['Tweet_punct'] = df['tweet'].apply(lambda x: remove_punct(x))
    df['Tweet_tokenized'] = df['Tweet_punct'].apply(lambda x: tokenization(x.lower()))
    df['Tweet_nonstop'] = df['Tweet_tokenized'].apply(lambda x: remove_stopwords(x))
    df['Tweet_stemmed'] = df['Tweet_nonstop'].apply(lambda x: stemming(x))
    df['Tweet_lemmatized'] = df['Tweet_stemmed'].apply(lambda x: lemmatizer(x))
    df['final'] = df['Tweet_lemmatized'].apply(lambda x : " ".join(x))
    df.drop(['Tweet_punct', 'Tweet_tokenized',
       'Tweet_nonstop', 'Tweet_stemmed'],axis=1,inplace=True)
    inf_list = vec.transform(df['final'])
    results = model.predict(inf_list)
    df['inf'] = results
    return df


def tweet_sentiment_results(hashtag,count,loaded_vec,loaded_model):
    df = load_tweets(hashtag,count)
    res = spit_results(df,loaded_vec,loaded_model)
    res['sentiment'] = res['inf'].apply(lambda x: "Positive" if x>0 else "Negative")
    res.drop(['Tweet_lemmatized','final'],axis=1,inplace=True)
    return res
