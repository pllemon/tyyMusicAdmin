<template>
  <div class="chart-content">
    <div ref="chart" style="width:100%;height:400px" />
    <div class="charts-select">
      <el-select v-model="type" placeholder="请选择" size="mini" style="width:100px" @change="changeType">
        <el-option label="月" :value="1" />
        <el-option label="年" :value="2" />
      </el-select>
    </div>
  </div>
</template>

<script>
const color = ['#5085f2', '#e75fc3', '#f59a8f']
export default {
  data() {
    return {
      chart: null,
      type: 1
    }
  },
  computed: {
    monthArr() {
      const arr = []
      for (let i = 1; i < 13; i++) {
        arr.push(i + '月份')
      }
      return arr
    },
    dateArr() {
      const arr = []
      const days = this.$moment(new Date(), 'YYYY-MM').daysInMonth()
      for (let i = 1; i < days + 1; i++) {
        arr.push(i + '日')
      }
      return arr
    }
  },
  mounted() {
    const that = this
    this.initCharts()
    window.addEventListener('resize', () => {
      setTimeout(() => {
        that.chart.resize()
      }, 50)
    })
  },
  methods: {
    changeType(val) {
      this.initCharts(val)
    },
    initCharts(type = 1) {
      let chartDate = null
      if (type == 1) {
        chartDate = this.monthArr
      } else {
        chartDate = this.dateArr
      }
      this.chart = this.$echarts.init(this.$refs.chart)
      const option = {
        color: color,
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          x: 'left'
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '25%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }
          }
        },
        legend: {
          x: 'center',
          top: '2%',
          selectedMode: false,
          textStyle: {
            color: '#90979c'
          },
          data: ['type1', 'type2', 'type3', '总数']
        },
        xAxis: [{
          type: 'category',
          data: chartDate
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'type1',
          type: 'bar',
          barMaxWidth: '40%',
          stack: '总量',
          data: [50, 20, 30, 40, 43, 13, 70, 80, 90, 100, 110]
        }, {
          name: 'type2',
          type: 'bar',
          stack: '总量',
          data: [10, 20, 30, 8, 20, 15, 70, 80, 90, 34, 60]
        }, {
          name: 'type3',
          type: 'bar',
          stack: '总量',
          data: [10, 20, 30, 80, 50, 10, 50, 80, 90, 50, 110]
        }, {
          name: '总数',
          type: 'line',
          stack: '总量',
          itemStyle: {
            normal: {
              color: '#8d7fec',
              label: {
                show: true,
                position: 'top',
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          data: [30, 60, 90, 120, 150, 180, 210, 80, 90, 100, 300]
        }]
      }
      this.chart.setOption(option)
    }
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
