from static.backEnd.app.model.elvModel import Elv
from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def getelv():
    sql = 'select area, with_elv, without_elv from house_elv'
    result = dbhelper.executeQuery(sql, None)
    elv = [Elv(*row) for row in result]
    elv_dict = [elv.__dict__ for elv in elv]
    return elv_dict