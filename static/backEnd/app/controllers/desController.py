from flask import Flask, Blueprint, request, jsonify

from static.backEnd.app.Dao.desDao import gethousecountBydisrict, housePriceHeatmap

desController = Blueprint('desController', __name__)

@desController.route('/house-count-by-district')
def houseCount():
    return gethousecountBydisrict()

@desController.route('/house-price-heatmap')
def housePrice():
    return housePriceHeatmap()

@desController.route('/house-area-distribution')
def houseAreaDistribution():
    return 'respond from house-area-distribution'

@desController.route('/house-tags')
def houseTags():
    return 'respond from house-tags'


