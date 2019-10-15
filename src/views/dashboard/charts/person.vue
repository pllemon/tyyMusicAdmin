<template>
  <div ref="chart" style="width:100%;height:300px;" />
</template>

<script>
import { rolestatistics } from '@/api/statistics'

const color = ['#8d7fec', '#5085f2', '#e75fc3', '#57e7ec']
export default {
  data() {
    return {
      chart: null,
      status: {
        1: '正常',
        2: '待审核',
        3: '已驳回',
        4: '禁用'
      }
    }
  },
  mounted() {
    const that = this
    that.getChartData()
    this.initCharts()
    window.addEventListener('resize', () => {
      setTimeout(() => {
        that.chart.resize()
      }, 50)
    })
  },
  methods: {
    getChartData() {
      const that = this
      rolestatistics().then(response => {
        const { data } = response
        const series = []
        console.log(data)
        for (var i in that.status) {
          series.push({
            name: that.status[i],
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
            data: [data.user[i] || 0, data.crafts_man[i] || 0, data.business[i] || 0]
          })
        }
        console.log(series)
        that.initCharts(series)
      })
    },
    initCharts(series = []) {
      this.chart = this.$echarts.init(this.$refs.chart)
      const option = {
        color: color,
        title: {
          text: '人员类型统计',
          subtext: '不同身份各种状态的数量统计',
          x: 'left'
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
          data: ['正常', '待审核', '已驳回', '禁用'],
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
          data: ['用户', '师傅', '商家']
        },
        series: series
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
