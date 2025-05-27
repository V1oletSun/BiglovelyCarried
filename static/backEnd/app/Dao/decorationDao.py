from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def getdecorations():
    sql = 'select * from house_decoration'
    result = dbhelper.executeQuery(sql,None)
    print(result)
    return jsonify(result)