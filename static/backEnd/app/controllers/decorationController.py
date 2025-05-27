from flask import Flask, Blueprint, request, jsonify

decorationController = Blueprint('decorationController', __name__)

@decorationController.route('/api/house-decoration', methods=['GET'])
def housedecoration():
    return 'respond from house-decoration'
