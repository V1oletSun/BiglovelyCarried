from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def gethousecountBydisrict():
    sql = 'select site,count(*) from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    print(result)
    return jsonify(result)

def housePriceHeatmap():
    sql = 'select site,avg(price) from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    print(result)
    return jsonify(result)