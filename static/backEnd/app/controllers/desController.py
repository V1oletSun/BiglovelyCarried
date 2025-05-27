from flask import Flask, Blueprint, request, jsonify

desController = Blueprint('desController', __name__)

@desController.route('/api/house-count-by-district', methods=['GET'])
def houseCount():
    return 'respond from house-count-by-district'

@desController.route('/api/house-price-by-district', methods=['GET'])
def housePrice():
    return 'respond from house-price-by-district'

@desController.route('/api/house-area-distribution', methods=['GET'])
def houseAreaDistribution():
    return 'respond from house-area-distribution'

@desController.route('/api/house-decoration', methods=['GET'])
def houseDecoration():
    return 'respond from house-decoration'

@desController.route('/api/house-tags', methods=['GET'])
def houseTags():
    return 'respond from house-tags'


