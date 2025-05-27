from flask import Flask, Blueprint, request, jsonify

from static.backEnd.app.Dao.desDao import gethousecountBydistrict, housePriceHeatmap, houseareadistribution, housetags

desController = Blueprint('desController', __name__)

@desController.route('/house-count-by-district')
def houseCount():
    return gethousecountBydistrict()

@desController.route('/house-price-heatmap')
def housePrice():
    return housePriceHeatmap()

@desController.route('/house-area-distribution')
def houseAreaDistribution():
    return houseareadistribution()

@desController.route('/house-tags')
def houseTags():
    return housetags()


