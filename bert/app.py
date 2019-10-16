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
app.config['CORS_HEADERS'] = 'Content-Type'
# import base as helper


#Instantiate Api object

api = Api(app)
@app.route('/')
@cross_origin()
def home():
    return jsonify({
        "text":"Here will be the API Docs"
    })

@app.route('/api/sentiment',methods = ['POST'])
@cross_origin()
def return_tweets():
    content = request.json
    text = content["text"]
    print("=======text========", content)
    sentiment = helper.get_sentiment(text)

    return jsonify({
        "sentiment": str(sentiment)
    })

if __name__== '__main__':
    app.run(debug=True, host='0.0.0.0')
