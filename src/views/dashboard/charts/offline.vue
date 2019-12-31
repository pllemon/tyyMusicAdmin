<template>
  <div class="chart-content">
    <div ref="chart" style="width:100%;height:300px" />
    <div class="charts-select">
      <el-select v-model="time_id" placeholder="请选择" size="mini" style="width:150px" @change="getChartData()">
        <el-option v-for="(item, index) in timeList" :key="index" :label="item.name" :value="index" />
      </el-select>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { unlinkorderstatistics } from '@/api/statistics'

const color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec']
export default {
  data() {
    return {
      chart: null,
      record: [],

      timeList: [
        { name: '全部时间', start: '', end: '' },
        { name: '今日订单', start: moment().startOf('days').format('YYYY-MM-DD HH:mm:ss'), end: moment().endOf('days').format('YYYY-MM-DD HH:mm:ss') },
        { name: '本周订单', start: moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'), end: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss') },
        { name: '本月订单', start: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') }
      ],
      time_id: 0
    }
  },
  computed: {
    ...mapState({
      offlineStatus: state => state.dict.offlineStatus
    }),
    legendRecord() {
      const legendObj = {}
      this.record.forEach(item => {
        legendObj[item.name] = item.value
      })
      return legendObj
    },
    totalNum() {
      let num = 0
      this.record.forEach(item => {
        num += item.value
      })
      return num
    }
  },
  mounted() {
    const that = this
    that.getChartData()

    window.addEventListener('resize', () => {
      setTimeout(() => {
        that.chart.resize()
      }, 50)
    })
  },
  methods: {
    getChartData() {
      const that = this
      unlinkorderstatistics({
        start_time: that.timeList[this.time_id].start,
        end_time: that.timeList[this.time_id].end
      }).then(response => {
        const { data } = response
        const recordArr = []
        for (var i in that.offlineStatus) {
          recordArr.push({
            value: data[i] || null,
            name: that.offlineStatus[i]
          })
        }
        that.record = recordArr
        that.initCharts()
      })
    },
    initCharts() {
      const that = this
      this.chart = this.$echarts.init(this.$refs.chart)
      const option = {
        color: color,
        title: [{
          text: '线下订单统计',
          subtext: '不同状态的数量统计',
          x: 'left'
        },
        {
          text: '合计',
          subtext: this.totalNum,
          textStyle: {
            fontSize: 14,
            color: '#333'
          },
          subtextStyle: {
            fontSize: 24,
            color: '#333'
          },
          textAlign: 'center',
          x: '49%',
          y: '45%'
        }],
        tooltip: {
          trigger: 'item',
          formatter: function(parms) {
            var str = parms.marker + '' + parms.data.name + '</br>' +
              '数量：' + parms.data.value + '</br>' +
              '占比：' + parms.percent + '%'
            return str
          }
        },
        series: [
          {
            name: '状态统计',
            type: 'pie',
            radius: ['40%', '56%'],
            center: ['50%', '55%'],
            labelLine: {
              normal: {
                show: true
              }
            },
            data: that.record
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
