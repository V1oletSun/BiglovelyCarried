from flask import Flask, Blueprint, request, jsonify

from static.backEnd.app.Dao.layoutDao import gethouseTypeCount

layoutController = Blueprint('layoutController', __name__)

@layoutController.route('/house-type-count')
def housePrices():
    return gethouseTypeCount()