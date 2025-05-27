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

def houseareadistribution():
    sql = 'select site,count(*) from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    print(result)
    return jsonify(result)

def housetags():
    sql = 'select feature1,count(*) from house_des group by feature1'
    result1 = dbhelper.executeQuery(sql,None)
    sql = 'select feature2,count(*) from house_des group by feature2'
    result2 = dbhelper.executeQuery(sql,None)
    result = result1+result2
    print(result1)
    print(result2)
    print(result)
    return jsonify(result)