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
    fetch('http://127.0.0.1:5000/house-count-by-district')
        .then(res => res.json())
        .then(data => {
            chartInstances.barCount.setOption({
                xAxis: { data: data.site, axisLabel: { rotate: 45 } },
                yAxis: {},
                series: [{ type: 'bar', data: data.count, itemStyle: { color: '#ff9999' } }]
            });
        });

    // 热力图：区县房价
fetch('http://127.0.0.1:5000/tianjin.json')
    .then(res => res.json())
    .then(geoJson => {
        echarts.registerMap('tianjin', geoJson);
        
        fetch('http://127.0.0.1:5000/house-price-heatmap')
            .then(res => res.json())
            .then(data => {
                chartInstances.heatmapPrice.setOption({
                    series: [{ 
                        type: 'map', 
                        map: 'tianjin', 
                        data: data, // 包含name（区县名）和value（房价）的对象数组
                        visualMap: { min: 0, max: 40000, text: ['低', '高'] }
                    }]
                });
            });
    });


    // 横向条形图：户型数量
    fetch('http://127.0.0.1:5000/house-type-count')
        .then(res => res.json())
        .then(data => {
            chartInstances.horizontalType.setOption({
                xAxis: { type: 'value' },
                yAxis: { data: data.layout },
                series: [{ type: 'bar', data: data.count, label: { position: 'right' } }]
            });
        });

    // 饼图：装修情况
    fetch('http://127.0.0.1:5000/house-decoration')
        .then(res => res.json())
        .then(data => {
            chartInstances.pieDecoration.setOption({
                series: [{ type: 'pie', data: data, radius: '60%', itemStyle: { colors: ['#ff9999', '#66ccff', '#99ff99', '#ffcc66'] } }]
            });
        });

    // 南丁格尔玫瑰图：面积分布
    fetch('http://127.0.0.1:5000/house-area-distribution')
        .then(res => res.json())
        .then(data => {
            chartInstances.roseArea.setOption({
                series: [{ type: 'pie', data: data, radius: ['30%', '75%'], roseType: 'radius', itemStyle: { colors: ['#ff9999', '#66ccff', '#99ff99', '#ffcc66', '#cc99ff'] } }]
            });
        });

    // 折线图：电梯配置
    fetch('http://127.0.0.1:5000/house-elevator-count')
        .then(res => res.json())
        .then(data => {
            chartInstances.lineElevator.setOption({
                xAxis: { data: data.districts },
                yAxis: {},
                series: [
                    { name: '有电梯', type: 'line', data: data.with_elv, itemStyle: { color: '#66ccff' } },
                    { name: '无电梯', type: 'line', data: data.without_elv, itemStyle: { color: '#ff9999' } }
                ]
            });
        });

    // 词云图：房子标签
fetch('http://127.0.0.1:5000/house-tags')
    .then(res => res.json())
    .then(data => {
        // 确保数据格式：[{name: '标签', value: 数量}]
        const formattedData = data.map(item => ({
            name: item.tagName, // 假设后端字段为tagName（如：'地铁'）
            value: item.tagCount // 假设后端字段为tagCount（如：100）
        }));
        
        chartInstances.wordcloud.setOption({
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                data: formattedData,
                textStyle: {
                    normal: {
                        color: () => `rgb(${Math.random() * 255 | 0}, ${Math.random() * 255 | 0}, ${Math.random() * 255 | 0})`
                    }
                }
            }]
        });
    });
       

    // 窗口自适应
    window.addEventListener('resize', () => {
        Object.values(chartInstances).forEach(chart => chart.resize());
    });
});
