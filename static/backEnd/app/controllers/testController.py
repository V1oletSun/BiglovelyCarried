from flask import Flask, request, jsonify, Blueprint

testController = Blueprint('testController', __name__)

@testController.route('/test')
def test():
    return 'test from testController'
