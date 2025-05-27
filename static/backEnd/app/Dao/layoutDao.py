from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def gethouseTypeCount():
    sql = 'select * from house_layout'
    result = dbhelper.executeQuery(sql,None)
    print(result)
    return jsonify(result)

