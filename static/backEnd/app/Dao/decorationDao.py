from static.backEnd.app.model.decorationModel import decoration
from static.backEnd.app.util import dbhelper
from flask import Flask, jsonify

def getdecorations():
    sql = 'select * from house_decoration'
    result = dbhelper.executeQuery(sql,None)
    decorations = [decoration(*row) for row in result]
    decorations_dict = [decorations.__dict__ for decorations in decorations]
    return decorations_dict