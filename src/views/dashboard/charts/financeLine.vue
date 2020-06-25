<template>
  <div class="chart-content">
    <div ref="chart" style="width:100%;height:400px" />
    <div class="charts-select">
      <el-date-picker
        v-model="year"
        type="year"
        size="mini"
        placeholder="选择年份"
        :clearable="false"
        :editable="false"
        style="width:150px">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
const color = ['#8d7fec', '#f2719a', '#5085f2', '#57e7ec', '#e75fc3', '#f87be2', '#fca4bb', '#f59a8f', '#fdb301']
export default {
  data() {
    return {
      chart: null,
      type: 1,

      year: this.$moment().format('YYYY')
    }
  },
  created() {
    console.log(this.year)
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
        title: [{
          text: '数量统计',
          subtext: '纯属虚构',
          x: 'left'
        }, {
          text: '占比分析',
          x: '75%'
        }, {
          text: '占比分析2',
          x: '75%',
          y: '50%'
        }],
        grid: {
          left: '2%',
          right: '30%',
          top: '22%',
          bottom: '2%',
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
          x: '25%',
          top: '2%',
          selectedMode: false,
          textStyle: {
            color: '#90979c'
          },
          data: ['label1', 'label2', 'label3', 'label4']
        },
        xAxis: [{
          type: 'category',
          data: chartDate
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'label1',
          type: 'line',
          smooth: true,
          data: [30, 60, 90, 120, 150, 180, 210, 80, 90, 100, 300, 50]
        }, {
          name: 'label2',
          type: 'line',
          smooth: true,
          data: [220, 500, 450, 120, 250, 280, 600, 450, 300, 500, 380, 250]
        }, {
          name: 'label3',
          type: 'line',
          smooth: true,
          data: [130, 60, 90, 50, 150, 130, 100, 80, 90, 250, 150, 180]
        }, {
          name: 'label4',
          type: 'line',
          smooth: true,
          data: [289, 500, 200, 433, 150, 270, 321, 80, 150, 176, 264, 444]
        }, {
          type: 'pie',
          center: ['87%', '30%'],
          radius: ['0%', '28%'],
          roseType: 'radius',
          data: [{
            value: 644,
            name: 'label1'
          }, {
            value: 100,
            name: 'label2'
          }, {
            value: 200,
            name: 'label3'
          }]
        }, {
          type: 'pie',
          center: ['87%', '80%'],
          radius: ['0%', '28%'],
          roseType: 'radius',
          data: [{
            value: 200,
            name: 'label1'
          }, {
            value: 366,
            name: 'label2'
          }, {
            value: 100,
            name: 'label3'
          }, {
            value: 245,
            name: 'label4'
          }]
        }]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
