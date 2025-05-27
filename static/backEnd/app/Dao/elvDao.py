from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def getelv():
    sql = 'select * from house_elv'
    result = dbhelper.executeQuery(sql, None)
    print(result)
    return jsonify(result)