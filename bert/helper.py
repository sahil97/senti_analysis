# Imports
import datetime
import pickle as pkl
import os
import math
import datetime
import re
from tqdm import tqdm
import pandas as pd
import numpy as np

import tensorflow as tf
from tensorflow import keras

print(tf.__version__)

# pip install bert-for-tf2
import bert
from bert import BertModelLayer
from bert.loader import StockBertConfig, map_stock_config_to_params, load_stock_weights
from bert.tokenization import FullTokenizer

MAX_SEQ_LEN = 128
MODEL_DIR = 'uncased_L-12_H-768_A-12/'
VOCAB_FILE = os.path.join(MODEL_DIR, 'vocab.txt')
BERT_CONFIG_FILE = os.path.join(MODEL_DIR, 'bert_config.json')
BERT_CKPT_FILE = os.path.join(MODEL_DIR, 'bert_model.ckpt')

def create_model(max_seq_len,adapter_size = 64): # Adapter size for adapter-bert

#     Creating Base Layer from bert_config
    with tf.io.gfile.GFile(BERT_CONFIG_FILE, "r") as reader:
        bc = StockBertConfig.from_json_string(reader.read())
        bert_params = map_stock_config_to_params(bc)
        bert_params.adapter_size = adapter_size
        bert = BertModelLayer.from_params(bert_params, name="bert")

    input_ids = keras.layers.Input(shape=(MAX_SEQ_LEN,), dtype='int32', name="input_ids")
    output = bert(input_ids)

    print("bert shape", output.shape)

    cls_out = keras.layers.Lambda(lambda seq: seq[:, 0, :])(output)
    cls_out = keras.layers.Dropout(0.5)(cls_out)
    logits = keras.layers.Dense(units=768, activation="tanh")(cls_out)
    logits = keras.layers.Dropout(0.5)(logits)
    logits = keras.layers.Dense(units=2, activation="softmax")(logits)

    model = keras.Model(inputs=input_ids, outputs=logits)
    model.build(input_shape=(None, max_seq_len))

    load_stock_weights(bert, BERT_CKPT_FILE)

    if adapter_size is not None:
      freeze_bert_layers(bert)

    model.compile(optimizer=keras.optimizers.Adam(),
                loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                metrics=[keras.metrics.SparseCategoricalAccuracy(name="acc")])

    print(model.summary())

    return model

def get_sentiment(text):

    try:
        model = create_model(MAX_SEQ_LEN, adapter_size=None)
        model.load_weights("./model_trained.h5")
    except:
        return "Cannot create model"

    pred_sentences = [str(text)]

    tokenizer = FullTokenizer(vocab_file=VOCAB_FILE)
    pred_tokens    = map(tokenizer.tokenize, pred_sentences)
    pred_tokens    = map(lambda tok: ["[CLS]"] + tok + ["[SEP]"], pred_tokens)
    pred_token_ids = list(map(tokenizer.convert_tokens_to_ids, pred_tokens))

    pred_token_ids = map(lambda tids: tids +[0]*(MAX_SEQ_LEN-len(tids)),pred_token_ids)
    pred_token_ids = np.array(list(pred_token_ids))

    print('pred_token_ids', pred_token_ids.shape)

    res = model.predict(pred_token_ids).argmax(axis=-1)

    for text, sentiment in zip(pred_sentences, res):
        return(["negative","positive"][sentiment])

    return sentiment
