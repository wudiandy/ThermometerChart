window.onload = function () {
	"use strict";
	var chartContainer = document.getElementById('custom_chart');
	var myCustomEchart = echarts.init(chartContainer);

	var config = {
		min: 0,
		max: 100,
		targetValue: {
			color: 'green',
			value: 60
		}
	};

	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: { // 直角坐标系
			top: 'middle',
			width: '80%',
			height: '10%'
		},
		yAxis: {
			show: false,
			type: 'category',
			axisTrick: {
				show: true
			}
		},
		xAxis: {
			show: true,
			splitLine: {
				show: false // 不显示分隔线
			},
			position: 'top'
		},
		graphic: {
			elements: [
				{
					type: 'rect',
					left: 'center',
					top: 'center',
					shape: {
						width: 450,
						height: 100
					},
					style: {
						fill: 'darkgrey'
					}
				}
			]
		},
		series: [{
			type: 'bar',
			barWidth: 30,
			silent: true,
			animation: false, // 背景应该直接显示,而不是逐渐升高
			itemStyle: {
				normal: {
					color: '#444'
				}
			},
			label: {
				normal: {
					show: false
				}
			},
			barGap: '-100%', // 柱间距离. 如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。
			data: [100]
		}, {
			name: '温度',
			type: 'bar',
			barWidth: 30,
			data: [{
				value: 50, // 液柱高度,取值范围0~100
				itemStyle: {
					normal: {
						color: 'red' // 液柱颜色
					}
				}
			}]
		}]
	};

	myCustomEchart.setOption(option);

	function setHorizontalGraphic(config) {
		var graphic = [];

		// 算出计划游标相对左端的偏移量
		var top = myCustomEchart.convertToPixel({
			yAxisIndex: 0
		}, 0); // xAxis的刻度0位置所对应的横向像素坐标
		top = parseFloat(top, 0).toFixed(2);
		top -= 26;

		// 存储targetValue,min和max变量
		var targetValue = config.targetValue.value;
		var min = config.min || 0;
		var max = config.max || 100;
		if (targetValue > max || targetValue < min) {
			return;
		}

		// 计算出划游标相对顶端的偏移量
		var left = myCustomEchart.convertToPixel({
			xAxisIndex: 0
		}, targetValue);
		left = parseFloat(left, 10).toFixed(2) - 2;

		graphic.push({
			z: 10,
			type: 'line',
			$action: 'replace',
			left: left,
			shape: {
				y1: 35,
				y2: 0
			},
			style: {
				stroke: 'blue',
				lineWidth: 3
			},
			silent: true,
			top: top
		});
		return {
			graphic: graphic
		};
	}

	myCustomEchart.setOption(setHorizontalGraphic(config), false);
};