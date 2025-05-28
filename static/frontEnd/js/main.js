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

    const commonFontStyle = {
        fontFamily: 'Microsoft YaHei',
        color: '#F0F0F0'
    };

    // 辅助函数：格式化数字为千分位
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 辅助函数：计算百分比
    function calculatePercentage(value, total) {
        return ((value / total) * 100).toFixed(1);
    }

    // 柱形图：区县在售数量
    fetch('http://127.0.0.1:5000/house-count-by-district')
        .then(res => res.json())
        .then(data => {
            const xData = data.map(item => item.site); // 提取区县名
            const yData = data.map(item => item.count); // 提取数量

            chartInstances.barCount.setOption({
                title: {
                    text: '区县在售房屋数量统计',
                    subtext: '按区域划分的房屋总数',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        return `${params[0].name}: ${formatNumber(params[0].value)} 套`;
                    }
                },
                legend: {
                    data: ['房屋数量'],
                    top: '5%',
                    left: 'right'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '房屋数量',
                    axisLabel: {
                        formatter: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                series: [{
                    name: '房屋数量',
                    type: 'bar',
                    data: yData,
                    itemStyle: { color: '#ff9999' },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function(params) {
                            return formatNumber(params.value);
                        }
                    }
                }]
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
                        name: item.site, // 区县名
                        value: Number(item.price) // 价格转数值
                    }));

                    chartInstances.heatmapPrice.setOption({
                        title: {
                            text: '区县房屋均价分布',
                            subtext: '单位：元/平方米',
                            textStyle: commonFontStyle
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return `${params.name}: ${formatNumber(params.value)} 元/㎡`;
                            }
                        },
                        visualMap: {
                            min: 0,
                            max: 40000,
                            text: ['高', '低'],
                            realtime: false,
                            calculable: true,
                            inRange: {
                                color: ['#e0ecff', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b']
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: { show: true },
                                dataView: { show: true, readOnly: false },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        series: [{
                            type: 'map',
                            map: 'tianjin',
                            data: formatted,
                            label: {
                                show: true
                            },
                            itemStyle: {
                                emphasis: {
                                    areaColor: '#99ccff'
                                }
                            }
                        }]
                    });
                });
        });

    // 横向条形图：户型数量
    fetch('http://127.0.0.1:5000/house-type-count')
        .then(res => res.json())
        .then(data => {
            const yData = data.map(item => item.layout); // 户型
            const xData = data.map(item => item.count); // 数量

            chartInstances.horizontalType.setOption({
                title: {
                    text: '不同户型房屋数量',
                    subtext: '按户型分类的房屋统计',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        return `${params.name}: ${formatNumber(params.value)} 套`;
                        //return `${params.name}: ${formatNumber(params[0].value)} 套`;
                    }
                },
                legend: {
                    data: ['数量'],
                    top: '5%',
                    left: 'right'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '房屋数量',
                    axisLabel: {
                        formatter: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: yData
                },
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: xData,
                    itemStyle: { color: '#66ccff' },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function(params) {
                            return formatNumber(params.value);
                        }
                    }
                }]
            });
        });

    // 饼图：装修情况
    fetch('http://127.0.0.1:5000/house-decoration')
        .then(res => res.json())
        .then(data => {
            const pieData = data.map(item => ({
                name: item.type, // 装修类型
                value: item.amount // 数量
            }));

            // 计算总量
            const total = pieData.reduce((sum, item) => sum + item.value, 0);

            chartInstances.pieDecoration.setOption({
                title: {
                    text: '房屋装修情况分布',
                    subtext: '按装修类型分类的比例',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `${params.name}: ${formatNumber(params.value)} 套 (${calculatePercentage(params.value, total)}%)`;
                    }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: pieData.map(item => item.name)
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [{
                    name: '装修类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        formatter: '{b}: {c} ({d}%)'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: pieData
                }]
            });
        });

    // 南丁格尔玫瑰图：面积分布
    fetch('http://127.0.0.1:5000/house-area-distribution')
        .then(res => res.json())
        .then(data => {
            const roseData = data.map(item => ({
                name: item.site, // 面积区间
                value: item.count // 数量
            }));

            // 计算总量
            const total = roseData.reduce((sum, item) => sum + item.value, 0);

            chartInstances.roseArea.setOption({
                title: {
                    text: '房屋面积分布情况',
                    subtext: '按面积区间分类的房屋数量',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `${params.name}: ${formatNumber(params.value)} 套 (${calculatePercentage(params.value, total)}%)`;
                    }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: roseData.map(item => item.name)
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [{
                    name: '面积区间',
                    type: 'pie',
                    radius: ['20%', '75%'],
                    roseType: 'radius',
                    data: roseData,
                    label: {
                        show: true,
                        formatter: '{b}: {c} ({d}%)'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 20
                    }
                }]
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
                title: {
                    text: '各区县电梯配置情况',
                    subtext: '有电梯与无电梯房屋数量对比',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function(params) {
                        let result = `${params[0].name}<br/>`;
                        params.forEach(item => {
                            result += `${item.seriesName}: ${formatNumber(item.value)} 套<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['有电梯', '无电梯'],
                    top: '5%',
                    left: 'right'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '房屋数量',
                    axisLabel: {
                        formatter: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                series: seriesData.map(series => ({
                    name: series.name,
                    type: 'line',
                    data: series.data,
                    itemStyle: {
                        color: series.name === '有电梯' ? '#66ccff' : '#ff9999'
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function(params) {
                            return formatNumber(params.value);
                        }
                    }
                }))
            });
        });

    // 词云图：房子标签
    fetch('http://127.0.0.1:5000/house-tags')
        .then(res => res.json())
        .then(data => {
            const wordData = data.map(item => ({
                name: item.feature, // 标签
                value: item.count // 数量
            }));

            chartInstances.wordcloud.setOption({
                title: {
                    text: '热门房屋标签统计',
                    subtext: '出现频率最高的房屋特征',
                    textStyle: commonFontStyle
                },
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        return `${params.data.name}: ${formatNumber(params.data.value)} 次`;
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    sizeRange: [12, 60],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    textStyle: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: wordData
                }]
            });
        });

    // 窗口自适应
    window.addEventListener('resize', () => {
        Object.values(chartInstances).forEach(chart => chart.resize());
    });
});
