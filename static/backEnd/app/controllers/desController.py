from flask import Flask, Blueprint, request, jsonify, send_from_directory

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

@desController.route('/tianjin.json')
def tianjin():
    # 绝对路径
    json_dir = r'd:\Doc\实习\Project\static\frontEnd\static'
    return send_from_directory(json_dir, 'tianjin.json', mimetype='application/json')