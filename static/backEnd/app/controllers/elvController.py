from flask import Flask, Blueprint, request, jsonify

elvController = Blueprint('elvController', __name__)

@elvController.route('/api/house-elevator-count', methods=['POST'])
def elv():
    return 'respond from elvController'