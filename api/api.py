from os import walk
from flask import Flask, request, session
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse
import re
# from chatbot import chatbot2
from flask_socketio import SocketIO, send
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
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
CORS(app)

@socketIo.on('message')
def handle_message(data):
    print('received message: ' + data)
    response = chatbot2.get_response(data)
    final = response.serialize()["text"]
    send(final, broadcast=False)
    return None

@app.route('/submit_file', methods=['POST'])
def checkFile():
    file = request.files['file']
    filename = file.filename
    models_link = "/Users/alex/Documents/WebDev/chatbot/api/chatbotapi/lib/python3.7/site-packages/chatterbot_corpus/data/custom"

    destination="/".join([models_link, filename])
    file.save(destination)

    return { 'somereturnshit': 'success' }

@app.route('/train_new_model', methods=['POST'])
def trainModel():

    models_link = "/Users/alex/Documents/WebDev/chatbot/api/chatbotapi/lib/python3.7/site-packages/chatterbot_corpus/data/custom"

    name = request.get_json()['name']
    chatbot = ChatBot(name)

    trainer = ChatterBotCorpusTrainer(chatbot)

    f = []
    for (dirpath, dirnames, filenames) in walk(models_link):
        f.extend(filenames)
        break

    newList = []
    for file in f:
        newFile = file.split(".")
        fil = "chatterbot.corpus.custom." + newFile[0]
        newList.append(fil)

    # When creating own YAML files, put them in: chatbot/api/chatbotapi/lib/chatterbot_corpus/data/custom
    trainer.train(
        "chatterbot.corpus.english.greetings",
        *newList
    )

    trainer.export_for_training(name + ".json")

    return { 'somereturnshit': 'success' }

if __name__ == '__main__':
    socketIo.run(app)