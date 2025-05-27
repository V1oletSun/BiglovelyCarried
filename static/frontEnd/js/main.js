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
            const xData = data.map(item => item.site[0]); // 提取区县名（数组第一项）
            const yData = data.map(item => item.count); // 提取数量
            chartInstances.barCount.setOption({
                xAxis: { data: xData, axisLabel: { rotate: 45 } },
                yAxis: {},
                series: [{ type: 'bar', data: yData, itemStyle: { color: '#ff9999' } }]
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
                const formatted = data.map(item => ({
                    name: item.site[0], // 区县名（数组第一项）
                    value: Number(item.price) // 价格转数值
                }));
                chartInstances.heatmapPrice.setOption({
                    series: [{ 
                        type: 'map', 
                        map: 'tianjin', 
                        data: formatted, 
                        visualMap: { min: 0, max: 40000 } 
                    }]
                });
            });
    });


    // 横向条形图：户型数量
    fetch('http://127.0.0.1:5000/house-type-count')
        .then(res => res.json())
        .then(data => {
            const yData = data.map(item => item.layout[0]); // 户型（数组第一项）
            const xData = data.map(item => item.count); // 数量
            chartInstances.horizontalType.setOption({
                xAxis: { type: 'value' },
                yAxis: { data: yData },
                series: [{ type: 'bar', data: xData, label: { position: 'right' } }]
            });
        });

    // 饼图：装修情况
    fetch('http://127.0.0.1:5000/house-decoration')
        .then(res => res.json())
        .then(data => {
            const pieData = data.map(item => ({
                name: item.type[0], // 装修类型（数组第一项）
                value: item.amount // 数量
            }));
            chartInstances.pieDecoration.setOption({
                series: [{ type: 'pie', data: pieData, radius: '60%' }]
            });
        });

    // 南丁格尔玫瑰图：面积分布
    fetch('http://127.0.0.1:5000/house-area-distribution')
        .then(res => res.json())
        .then(data => {
            const roseData = data.map(item => ({
                name: item.site[0], // 面积区间（数组第一项，需实际字段）
                value: item.count // 数量（需实际字段）
            }));
            chartInstances.roseArea.setOption({
                series: [{ type: 'pie', data: roseData, roseType: 'radius' }]
            });
        });

    // 折线图：电梯配置
    fetch('http://127.0.0.1:5000/house-elevator-count')
        .then(res => res.json())
        .then(data => {
            const xData = data.map(item => item.districts); // 区县
            const seriesData = [
                { name: '有电梯', data: data.map(item => item.with_elv) },
                { name: '无电梯', data: data.map(item => item.without_elv) }
            ];
            chartInstances.lineElevator.setOption({
                xAxis: { data: xData },
                yAxis: {},
                series: seriesData.map(series => ({
                    type: 'line',
                    name: series.name,
                    data: series.data,
                    itemStyle: { color: series.name === '有电梯' ? '#66ccff' : '#ff9999' }
                }))
            });
        });

    // 词云图：房子标签
fetch('http://127.0.0.1:5000/house-tags')
    .then(res => res.json())
    .then(data => {
        const wordData = data.map(item => ({
            name: item.feature[0], // 标签（数组第一项）
            value: item.count // 数量
        }));
        chartInstances.wordcloud.setOption({
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                data: wordData,
                textStyle: { color: () => `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})` }
            }]
        });
    });
       

    // 窗口自适应
    window.addEventListener('resize', () => {
        Object.values(chartInstances).forEach(chart => chart.resize());
    });
});	
