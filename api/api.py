from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import re
from chatbot import chatbot2
from flask_socketio import SocketIO, send
# import spacy
# from spacy import displacy
# nlp = spacy.load("en_core_web_sm")

#inside api
#virtualenv chatbotapi
#export FLASK_APP=api.py
#source chatbotapi/bin/activate
#flask run

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketIo = SocketIO(app, cors_allowed_origins="*")
# CORS(app)


@socketIo.on('message')
def handle_message(data):
    print('received message: ' + data)
    response = chatbot2.get_response(data)
    final = response.serialize()["text"]
    send(final, broadcast=False)
    return None

@app.route('/submit_text', methods=['POST'])
def checkText():
    text = request.get_json()['message']
    response = chatbot2.get_response(text)
    final = response.serialize()["text"]
    
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

    return { 'message': final }

if __name__ == '__main__':
    socketIo.run(app)