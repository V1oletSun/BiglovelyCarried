import pymysql

from static.backEnd.app.config import dbconnection


def executeUpdate(sql,params):
    #获取数据库链接
    conn=dbconnection.getConn()
    print(conn)
    cs=conn.cursor()
    try:
        if params!=None and len(params)>0:
            cs.execute(sql,params)

        else:
            cs.execute(sql)


        conn.commit()
        print('执行成功！')
    except:
        print('执行失败！')
        conn.rollback()#回滚操作
        pass

    cs.close()
    conn.close()

    pass

'''
通用查询功能的函数
'''
def executeQuery(sql,params):
    conn=dbconnection.getConn()
    cs=conn.cursor()

    try:
        if params != None and len(params) > 0:
            cs.execute(sql, params)
        else:
            cs.execute(sql)

        rst=cs.fetchall()
        return rst
    except:
        print('执行失败！')
        pass

    cs.close()
    conn.close()

# if __name__ == '__main__':
#     executeUpdate('',())

