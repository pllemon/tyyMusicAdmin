<template>
  <div class="chart-content">
    <el-row>
      <el-col :span="12">
        <div ref="chart" style="width:100%;height:300px" />
        <div class="charts-select">
          <el-select v-model="network_id" placeholder="请选择" size="mini" style="width:150px" @change="getChartData()">
            <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="time_id" placeholder="请选择" size="mini" style="width:150px" @change="getChartData()">
            <el-option v-for="(item, index) in timeList" :key="index" :label="item.name" :value="index" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="12"> 
        <ul class="order-ul">
          <li v-for="(item, index) in record" :key="index">
            <div>
              <img src="@/assets/qp.png" v-if="item.value && (index==0 || index == 2 || index==3)"/>
              <p class="value">{{item.value ? item.value : 0}}</p>
            </div>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { orderstatistics } from '@/api/statistics'

const color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec']
export default {
  data() {
    return {
      chart: null,
      record: [],

      networkList: [],
      network_id: '',

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
      orderStatus: state => state.dict.orderStatus
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

    this.common.getAllNetwork(this, function(res) {
      that.networkList.unshift({
        id: '',
        name: '全部网点'
      })
    })

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
      orderstatistics({
        network_id: that.network_id,
        startTime: that.timeList[this.time_id].start,
        endTime: that.timeList[this.time_id].end
      }).then(response => {
        const { data } = response
        const recordArr = []
        for (var i in that.orderStatus) {
          recordArr.push({
            value: data[i] || null,
            name: that.orderStatus[i]
          })
        }
        that.record = recordArr
        console.log(recordArr)
        that.initCharts()
      })
    },
    initCharts() {
      const that = this
      this.chart = this.$echarts.init(this.$refs.chart)
      const option = {
        color: color,
        title: [{
          text: '线上订单统计',
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
            radius: ['36%', '56%'],
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
<style scoped lang="scss">
.order-ul{
  display: flex;
  flex-wrap: wrap;
  margin-top: 70px;
  li{
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    div{
      position: relative;
      min-width: 30px;
      text-align: center;
    }
    img{
      position: absolute;
      width: 40px;
      right: -45px;
      top: -10px;
    }
    .value{
      font-size: 22px;
      margin-bottom: 8px;
      color: #666;
    }
    .name{
      font-size: 12px;
      color: rgba(0,0,0,.45);
    }
  }
}
</style>