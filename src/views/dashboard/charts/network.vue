<template>
  <div style="width:100%;height:300px;" ref="chart"></div>
</template>

<script>
let color = ['#8d7fec', '#5085f2', '#e75fc3', '#57e7ec']

export default{
  data () {
    return {
      chart: null
    }
  },
  methods: {
    initCharts () {
      this.chart = this.$echarts.init(this.$refs.chart);
      let option = {
        color: color,
        title : {
            text: '人员类型',
            subtext: '纯属虚构',
            x:'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '25%',
          bottom: '5%',
          containLabel: true
        },
        legend: {
          data: ['状态1', '状态2', '状态3', '状态4'],
          selectedMode: false,
          right: 10,
          top: 10,
          itemWidth: 15,
          itemHeight: 10
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              show: false,
              fontSize: 14,
              color: '#606266'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            }
        },
        xAxis: {
            type: 'category',
            axisLabel: {
              fontSize: 14,
              color: '#606266'
            },
            axisLine: {
              lineStyle: {
                color: '#606266'
              }
            },
            data: ['类型1', '类型2', '类型3']
        },
        series: [ {
            name: '状态1',
            type: 'bar',
            barWidth: 10,
            barGap: '80%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 14
              }
            },
            data: [1, 2, 3]
        }, {
            name: '状态2',
            type: 'bar',
            barWidth: 10,
            barGap: '80%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 14
              }
            },
            data: [4, 5, 6]
        }, {
            name: '状态3',
            type: 'bar',
            barWidth: 10,
            barGap: '80%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 14
              }
            },
            data: [7, 8, 9]
        },{
            name: '状态4',
            type: 'bar',
            barWidth: 10,
            barGap: '80%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 14
              }
            },
            data: [7, 8, 9]
        },]
      }
      this.chart.setOption(option)
    }
  },
  mounted () {
    let that = this
    this.initCharts()
    window.addEventListener("resize", () => {
      setTimeout(() => {
        that.chart.resize()
      }, 50)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
