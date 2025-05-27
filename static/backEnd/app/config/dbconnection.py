import pymysql
'''
数据库链接文件的构建
'''
def getConn():
    conn = pymysql.connect(host='localhost', port=3306, user='root', password='', db='houses', charset='utf8')
    return conn

