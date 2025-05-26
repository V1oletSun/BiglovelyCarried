document.addEventListener('DOMContentLoaded', () => {
    // 初始化图表实例
    const chartInstances = {
        barCount: echarts.init(document.getElementById('bar-count')),
        heatmapPrice: echarts.init(document.getElementById('heatmap-price')),
        horizontalType: echarts.init(document.getElementById('horizontal-type')),
        pieDecoration: echarts.init(document.getElementById('pie-decoration')),
        roseArea: echarts.init(document.getElementById('rose-area')),
        lineElevator: echarts.init(document.getElementById('line-elevator')),
        wordcloud: echarts.init(document.getElementById('wordcloud-chart'))
    };

    // 柱形图：区县在售数量
    fetch('/api/house-count-by-district')
        .then(res => res.json())
        .then(data => {
            chartInstances.barCount.setOption({
                xAxis: { data: data.districts, axisLabel: { rotate: 45 } },
                yAxis: {},
                series: [{ type: 'bar', data: data.counts, itemStyle: { color: '#ff9999' } }]
            });
        });

    // 热力图：区县房价
    fetch('/api/house-price-heatmap')
        .then(res => res.json())
        .then(data => {
            echarts.registerMap('tianjin', window.tianjin);
            chartInstances.heatmapPrice.setOption({
                series: [{ type: 'map', map: 'tianjin', data: data, visualMap: { min: 0, max: 40000 } }]
            });
        });

    // 横向条形图：户型数量
    fetch('/api/house-type-count')
        .then(res => res.json())
        .then(data => {
            chartInstances.horizontalType.setOption({
                xAxis: { type: 'value' },
                yAxis: { data: data.types },
                series: [{ type: 'bar', data: data.counts, label: { position: 'right' } }]
            });
        });

    // 饼图：装修情况
    fetch('/api/house-decoration')
        .then(res => res.json())
        .then(data => {
            chartInstances.pieDecoration.setOption({
                series: [{ type: 'pie', data: data, radius: '60%', itemStyle: { colors: ['#ff9999', '#66ccff', '#99ff99', '#ffcc66'] } }]
            });
        });

    // 南丁格尔玫瑰图：面积分布
    fetch('/api/house-area-distribution')
        .then(res => res.json())
        .then(data => {
            chartInstances.roseArea.setOption({
                series: [{ type: 'pie', data: data, radius: ['30%', '75%'], roseType: 'radius', itemStyle: { colors: ['#ff9999', '#66ccff', '#99ff99', '#ffcc66', '#cc99ff'] } }]
            });
        });

    // 折线图：电梯配置
    fetch('/api/house-elevator-count')
        .then(res => res.json())
        .then(data => {
            chartInstances.lineElevator.setOption({
                xAxis: { data: data.districts },
                yAxis: {},
                series: [
                    { name: '有电梯', type: 'line', data: data.elevator, itemStyle: { color: '#66ccff' } },
                    { name: '无电梯', type: 'line', data: data.noElevator, itemStyle: { color: '#ff9999' } }
                ]
            });
        });

    // 词云图：房子标签
    fetch('/api/house-tags')
        .then(res => res.json())
        .then(data => {
            chartInstances.wordcloud.setOption({
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    data: data,
                    textStyle: { color: () => `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})` }
                }]
            });
        });

    // 窗口自适应
    window.addEventListener('resize', () => {
        Object.values(chartInstances).forEach(chart => chart.resize());
    });
});