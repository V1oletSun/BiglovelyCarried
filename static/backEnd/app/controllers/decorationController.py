from flask import Flask, Blueprint, request, jsonify

from static.backEnd.app.Dao.decorationDao import getdecorations

decorationController = Blueprint('decorationController', __name__)

@decorationController.route('/house-decoration')
def housedecoration():
    return getdecorations()
