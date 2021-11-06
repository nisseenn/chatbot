from chatterbot.trainers import ChatterBotCorpusTrainer
from chatbot import chatbot2

trainer = ChatterBotCorpusTrainer(chatbot2)

# aList = [
#     "chatterbot.corpus.custom.municipality_general",
#     "chatterbot.corput.custom.municipality_lillehammer"
# ]

# #When creating own YAML files, put them in: chatbot/api/chatbotapi/lib/chatterbot_corpus/data/custom
# trainer.train(
#     "chatterbot.corpus.english.greetings",
#     *aList
# )

# trainer.export_for_training('./2.json')