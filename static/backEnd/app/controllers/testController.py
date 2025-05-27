from flask import Flask, request, jsonify, Blueprint, send_from_directory

testController = Blueprint('testController', __name__)

@testController.route('/index.html')
def index():
    html_dir = r'd:\Doc\实习\Project\static\frontEnd'
    return send_from_directory(html_dir, 'index.html', mimetype='application/html')