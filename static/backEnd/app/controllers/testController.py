from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS

testController = Blueprint('testController', __name__)

@testController.route('/')
def test():
    return 'test'
