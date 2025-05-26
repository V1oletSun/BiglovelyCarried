from flask import Flask

from static.backEnd.app.controllers.testController import testController

def create_apps():
    app = Flask(__name__)
    app.register_blueprint(testController)
    return app