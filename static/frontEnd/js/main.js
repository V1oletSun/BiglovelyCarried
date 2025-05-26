document.addEventListener('DOMContentLoaded', function() {
    const chartInstances = {
        barChart: echarts.init(document.getElementById('bar-chart')),
        heatmapChart: echarts.init(document.getElementById('heatmap-chart')),
        horizontalBarChart: echarts.init(document.getElementById('horizontal-bar-chart')),
        pieChart: echarts.init(document.getElementById('pie-chart')),
        decorationChart: echarts.init(document.getElementById('decoration-chart')),
        wordcloudChart: echarts.init(document.getElementById('wordcloud-chart'))
    };

    // 1. 天津各区县在售房子数量（GET请求）
    fetch('/api/house-count-by-district', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            chartInstances.barChart.setOption({
                title: { text: '天津各区县在售房子数量' },
                xAxis: { data: data.districts, axisLabel: { rotate: 45 } },
                yAxis: {},
                series: [{ type: 'bar', data: data.counts, itemStyle: { color: '#ff9999' } }]
            });
        });

    // 2. 天津各区县房价分布（GET请求）
    fetch('/api/house-price-by-district', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            echarts.registerMap('tianjin', window.tianjin);
            chartInstances.heatmapChart.setOption({
                title: { text: '天津各区县房价分布' },
                series: [{ type: 'map', map: 'tianjin', data: data, visualMap: { min: 0, max: 40000 } }]
            });
        });

    // 3. 各户型房子数量分布（GET请求）
    fetch('/api/house-type-count', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            chartInstances.horizontalBarChart.setOption({
                title: { text: '各户型房子数量分布' },
                xAxis: { type: 'value' },
                yAxis: { type: 'category', data: data.types },
                series: [{ type: 'bar', data: data.counts, label: { position: 'right' } }]
            });
        });

    // 4. 房子面积分布（GET请求）
    fetch('/api/house-area-distribution', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            chartInstances.pieChart.setOption({
                title: { text: '房子面积分布' },
                series: [{ type: 'pie', data: data, radius: '60%' }]
            });
        });

    // 5. 装修情况分布（GET请求）
    fetch('/api/house-decoration', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            chartInstances.decorationChart.setOption({
                title: { text: '装修情况分布' },
                series: [{ type: 'pie', data: data, radius: '60%' }]
            });
        });

    // 6. 热门标签词云（GET请求）
    fetch('/api/house-tags', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            chartInstances.wordcloudChart.setOption({
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    data: data,
                    textStyle: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    }
                }]
            });
        });

    // 窗口大小变化时自适应
    window.addEventListener('resize', () => {
        Object.values(chartInstances).forEach(chart => chart.resize());
    });
});