from static.backEnd.app.model.layoutModel import Layout
from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def gethouseTypeCount():
    sql = 'select * from house_layout'
    result = dbhelper.executeQuery(sql, None)
    layouts = [Layout(*row) for row in result]# 转换为字典列表
    layout_dicts = [layout.__dict__ for layout in layouts]
    return jsonify(layout_dicts)
