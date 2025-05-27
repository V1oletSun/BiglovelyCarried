class Des:
    def __init__(self, type, area, site, feature1, feature2, price, ave_area):
        self.type = type
        self.area = area
        self.site = site
        self.feature1 = feature1
        self.feature2 = feature2
        self.price = price
        self.ave_area = ave_area

class HouseCountByDistrict:
    def __init__(self, site, count):
        self.site = site
        self.count = count

class PriceHeatmap:
    def __init__(self, site, price):
        self.site = site
        self.price = price

class Areadistribution:
    def __init__(self, site, count):
        self.site = site
        self.count = count

class features:
    def __init__(self, feature, count):
        self.feature = feature
        self.count = count