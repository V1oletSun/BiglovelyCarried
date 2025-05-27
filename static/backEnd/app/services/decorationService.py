from flask import Flask

from static.backEnd.app.controllers.decorationController import decorationController

def create_decoration_app():
    app = Flask(__name__)
    app.register_blueprint(decorationController, url_prefix='/api')
    return app