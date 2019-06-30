from flask import Flask,request, jsonify
from flask_restful import Resource, reqparse, Api
import base as helper
from flask_cors import CORS
# data analysis and wrangling
import pandas as pd
import numpy as np
from sklearn import feature_extraction, model_selection, naive_bayes, metrics, svm
import pickle as pkl
import datetime as datetime
# machine learning
from sklearn.naive_bayes import GaussianNB
#Instantiate a flask object
app = Flask(__name__)
CORS(app)

#Instantiate Api object
api = Api(app)



# Loading Models and Transformers

loaded_vec = feature_extraction.text.CountVectorizer(decode_error="replace",vocabulary=pkl.load(open("vect.pkl", "rb")))
loaded_model = pkl.load(open("naiveBayes.pkl", 'rb'))




def preProcess(transformer, str):
    if(len(str)<1):
        return
    else:
        str = [str]
        str = transformer.transform(str)
        return str


@app.route('/')
def home():
    return jsonify({
        "text":"Here will be the API Docs"
    })



@app.route('/api/v0.1/inference',methods = ['POST'])
def inference():
    content = request.json
    str = content["text"]
    str = preProcess(loaded_vec,str)
    inference = loaded_model.predict(str)
    sentiment = "Positive" if (inference == 4 ) else "Negative"
    return jsonify({
        "inference":sentiment
    })

@app.route('/api/v0.1/tweets', methods = ['POST'])
def tweet():
    content = request.json
    hashtag = content["hashtag"]
    count = content["count"]  # Will be mulitplied by 100
    result = pd.DataFrame()
    # for i in range(count):
    result = result.append(helper.tweet_sentiment_results(hashtag,200,loaded_vec,loaded_model))
        # print(len(result))
    print(len(result))
    result_sorted = result.sort_values(by=['time'],ascending=True)
    del result
    print(len(result_sorted))
    result_sorted['time'] = result_sorted['time'].apply(lambda x: datetime.datetime(x.year, x.month, x.day, x.hour,5*round((float(x.minute) + float(x.second)/60) / 6)))
    result_sorted = result_sorted.groupby(by=['time','inf']).count()
    print(len(result_sorted))
    result_sorted = result_sorted.reset_index()
    print(len(result_sorted))
    pos_reviews = result_sorted[result_sorted['inf']==4]
    pos_reviews.drop(['sentiment'],axis=1,inplace=True)
    print(len(pos_reviews))
    neg_reviews = result_sorted[result_sorted['inf']==0]
    neg_reviews.drop(['sentiment'],axis=1,inplace=True)
    print(len(neg_reviews))
    del result_sorted
    return jsonify({
        "positive": pos_reviews.to_dict('records'),
        "Negative": neg_reviews.to_dict('records')
    })


if __name__== '__main__':
    app.run(debug=True)
