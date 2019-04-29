from flask import Flask,request, jsonify
from flask_restful import Resource, reqparse, Api
#Instantiate a flask object
app = Flask(__name__)
#Instantiate Api object
api = Api(app)



# data analysis and wrangling
import pandas as pd
import numpy as np
from sklearn import feature_extraction, model_selection, naive_bayes, metrics, svm
import pickle as pkl

# machine learning
from sklearn.naive_bayes import GaussianNB





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

if __name__== '__main__':
    app.run(debug=True)
