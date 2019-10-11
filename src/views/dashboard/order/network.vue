<template>
  <div style="width:100%;height:300px" ref="chart"></div>
</template>

<script>
let color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec'];
export default{
  data () {
    return {}
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs.chart);
      let option = {
        color: color,
        title : {
            text: '人员类型',
            subtext: '纯属虚构',
            x:'left'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150],
            type: 'bar'
        }]
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    this.initCharts()
  }
}
</script>

<style lang="scss" scoped>
</style>
