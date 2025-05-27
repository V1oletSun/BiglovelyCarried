import pymysql
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import imageio

# 数据库配置
db_config = {
    "host": "localhost",
    "user": "your_username",
    "password": "your_password",
    "db": "your_database",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}

def get_keywords_data():
    try:
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()
        sql = "SELECT keyword, count FROM keywords_table"
        cursor.execute(sql)
        data = cursor.fetchall()
        conn.close()
        return data
    except pymysql.Error as e:
        print(f"数据库连接或查询错误: {e}")
        return []

keywords_data = get_keywords_data()

if keywords_data:
    # 准备数据，将关键词和数量转换为适合wordcloud的格式
    keywords_dict = {item['keyword']: item['count'] for item in keywords_data}

    # 配置词云参数
    wordcloud = WordCloud(
        background_color='white',
        width=800,
        height=600,
        max_words=200,
        min_font_size=10,
        font_path='msyh.ttc'
    ).generate_from_frequencies(keywords_dict)

    # 保存词云图为图片文件
    wordcloud.to_file('wordcloud.png')

    # 读取词云图片
    image = imageio.imread('wordcloud.png')

    # 制作gif动画，设置循环次数等参数
    images = [image] * 5
    imageio.mimsave('keyword_wordcloud.gif', images, duration=0.5)
else:
    print("未获取到有效数据，无法生成词云及动画。")