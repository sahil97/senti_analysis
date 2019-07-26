# Flask Imports
from flask import Flask,request, jsonify
from flask_restful import Resource, reqparse, Api
from flask_cors import CORS

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
def home():
    return jsonify({
        "text":"Here will be the API Docs"
    })

@app.route('/api/tweets_analysis',methods = ['POST'])
def return_tweets():
    content = request.json
    hashtag = content["hashtag"]

    temp_df, retweets = helper.get_tweets(hashtag, 1000)
    temp_df, time_grouped_column_name = helper.groupByTime(temp_df, 'created_at')
    time_count = helper.return_time_count(temp_df, time_grouped_column_name)

    # tweets = helper.get_tweets(hashtag)
    # inference = loaded_model.predict(str)
    # sentiment = "Positive" if (inference == 4 ) else "Negative"
    return jsonify({
        "total_count": len(temp_df),
        "retweets": retweets,
        "time_count": time_count
    })

if __name__== '__main__':
    app.run(debug=True)
