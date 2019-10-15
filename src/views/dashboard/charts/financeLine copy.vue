<template>
  <div style="width:100%;height:300px" ref="chart"></div>
</template>

<script>
import echarts from 'echarts';
let color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec'];
export default {
  data() {
    return {
      chart: null,
      chartMes: {
        color: ['rgba(141,127,236', 'rgba(253,179,1'],
        legendType: ['统计1', '统计2'],
        value: [
          [300, 282, 220, 320, 240, 280, 190, 250],
          [451, 352, 303, 534, 95, 236, 217, 328]
        ],
        xData: [],
        yData: []
      }
    }
  },
  methods: {
    // 格式化数据
    changeData () {
      this.chartMes.yData = [];
      this.chartMes.legendType.forEach( (item, index) => {
        let obj = {
          name: item,
          type: 'line',
          color: this.chartMes.color[index] + ')',
          smooth: true,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.chartMes.color[index] + ',0)'
              }, {
                  offset: 0.5,
                  color: this.chartMes.color[index] + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          symbol: 'circle',
          symbolSize: 5,
          data: this.chartMes.value[index]
        };
        this.chartMes.yData.push(obj);
      })
    },

    // 初始化图像
    initChart () {
      this.changeData();
      
      this.chart = this.$echarts.init(this.$refs.chart)
      this.chart.setOption({
        grid: {
            left: '6%',
            right: '6%',
            bottom: '16%',
            top:"5%",
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#edeeff'
                }
            }
        },
        legend: {
            x: 'center',
            y: 'bottom',
            textStyle: {
              color:"#edeeff",
                fontSize:14
            },
            data: this.chartMes.legendType
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
                show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                  color: '#edeeff'
              }
            },
            axisLabel: {
                inside: false,
                textStyle: {
                    color: '#dfdfdf',
                    fontWeight: 'normal',
                    fontSize: '12',
                    lineHeight: 22
                }
            },
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
                color: '#edeeff'
            }
          },
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#dfdfdf',
                fontWeight: 'normal',
                fontSize: '12',
                lineHeight: 22
            }
          },
          splitLine: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        series: this.chartMes.yData
      })
    }
  },
  mounted() {
    const that = this
    this.initChart()
    window.addEventListener('resize', () => {
      setTimeout(() => {
        that.chart.resize()
      }, 50)
    })
  }
}
</script>

<style lang="scss" scoped>
.chart-content{
  position: relative;
}
.charts-select{
  position: absolute;
  top: 6px;
  right: 6px;
}
</style>
