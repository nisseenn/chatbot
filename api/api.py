from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import re
import spacy
from spacy import displacy
import en_core_web_sm
nlp = spacy.load('en_core_web_sm')

app = Flask(__name__)
CORS(app)

@app.route('/submit_text', methods=['POST'])
def checkText():
    text = request.get_json()['message']
    # doc = nlp(text)
    # d = []
    # for token in doc:
    #         print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
    #         token.shape_, token.is_alpha, token.is_stop)
			# d.append((ent.label_, ent.text))
			# df = pd.DataFrame(d, columns=('named entity', 'output'))
			# ORG_named_entity = df.loc[df['named entity'] == 'ORG']['output']
			# PERSON_named_entity = df.loc[df['named entity'] == 'PERSON']['output']
			# GPE_named_entity = df.loc[df['named entity'] == 'GPE']['output']
			# MONEY_named_entity = df.loc[df['named entity'] == 'MONEY']['output']

    return { 'message': text }