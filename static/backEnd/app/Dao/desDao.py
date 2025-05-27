from static.backEnd.app.model.desModel import Des, HouseCountByDistrict, PriceHeatmap, Areadistribution, features
from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def gethousecountBydistrict():
    sql = 'select site,count(*) as count from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    houseCountByDistrict = [HouseCountByDistrict(*row) for row in result]
    des_dict = [des.__dict__ for des in houseCountByDistrict]
    return des_dict

def housePriceHeatmap():
    sql = 'select site,avg(price) as price from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    priceHeatmap = [PriceHeatmap(*row) for row in result]
    priceHeatmap_dict = [priceHeatmap.__dict__ for priceHeatmap in priceHeatmap]
    return priceHeatmap_dict

def houseareadistribution():
    sql = 'select site,count(*) as count from house_des group by site'
    result = dbhelper.executeQuery(sql,None)
    areadistribution = [Areadistribution(*row) for row in result]
    areadistribution_dict = [areadistribution.__dict__ for areadistribution in areadistribution]
    return areadistribution_dict

def housetags():
    sql = 'select feature1,count(*) as count from house_des group by feature1'
    result1 = dbhelper.executeQuery(sql,None)
    sql = 'select feature2,count(*) as count from house_des group by feature2'
    result2 = dbhelper.executeQuery(sql,None)
    result = result1+result2
    feature = [features(*row) for row in result]
    feature_dict = [feature.__dict__ for feature in feature]
    return feature_dict