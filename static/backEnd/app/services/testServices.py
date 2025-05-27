from flask import Flask
from flask_cors import CORS

from static.backEnd.app.controllers.decorationController import decorationController
from static.backEnd.app.controllers.desController import desController
from static.backEnd.app.controllers.elvController import elvController
from static.backEnd.app.controllers.layoutConrtoller import layoutController
from static.backEnd.app.controllers.testController import testController

def create_test_app():
    app = Flask(__name__)
    app.register_blueprint(testController)
    app.register_blueprint(decorationController)
    app.register_blueprint(layoutController)
    app.register_blueprint(elvController)
    app.register_blueprint(desController)
    return app