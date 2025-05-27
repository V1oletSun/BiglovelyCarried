from flask import Flask, Blueprint, request, jsonify

layoutController = Blueprint('layoutController', __name__)

@layoutController.route('/api/house-type-count', methods=['GET'])
def housePrices():
    return 'respond from house-type-count'