# Flask Imports
from flask import Flask,request, jsonify
from flask_restful import Resource, reqparse, Api
from flask_cors import CORS, cross_origin

# data analysis and wrangling
import pandas as pd
import datetime as datetime

import helper as helper

#Instantiate a flask object
app = Flask(__name__)
CORS(app)

# import base as helper


#Instantiate Api object

api = Api(app)
@app.route('/')
@cross_origin()
def home():
    return jsonify({
        "text":"Here will be the API Docs"
    })

@app.route('/api/tweets_analysis',methods = ['POST'])
@cross_origin()
def return_tweets():
    content = request.json
    hashtag = content["hashtag"]

    temp_df, retweets = helper.get_tweets(hashtag, 10000)
    temp_df, time_grouped_column_name, end_value = helper.groupByTime(temp_df, 'created_at',0)
    time_count = helper.return_time_count(temp_df, time_grouped_column_name)
    pos_count,pos_tweets, neg_count, neg_tweets = helper.split_into_pos_neg(temp_df,end_value)

    return jsonify({
        "total_count": len(temp_df),
        "retweets": retweets,
        "time_count": time_count,
        "pos_count": pos_count,
        "pos_tweets": pos_tweets,
        "neg_count": neg_count,
        "neg_tweets": neg_tweets
    })

if __name__== '__main__':
    app.run(debug=True)
