from flask import Flask, Blueprint, request, jsonify

from static.backEnd.app.Dao.elvDao import getelv

elvController = Blueprint('elvController', __name__)

@elvController.route('/house-elevator-count')
def elv():
    return getelv()