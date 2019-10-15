<template>
  <div style="width:100%;height:300px" ref="chart"></div>
</template>

<script>
let color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec'];
let colorArray = [
  {
    top: '#8d7fec',
    bottom: 'rgba(141, 127, 236,.3)'
  }, {
    top: '#5085f2',
    bottom: 'rgba(80, 133, 242, 0.3)'
  },
  {
    top: '#e75fc3',
    bottom: 'rgba(231, 95, 195,.3)'
  }
];
export default {
  data() {
    return {}
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs.chart);
      let option = {
        title : {
            text: '人员类型',
            subtext: '纯属虚构',
            x:'left'
        },
        xAxis: {
            type: 'value',
            show: false
        },
        yAxis: {
            type: 'category',
            inverse: 'true',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              fontSize: 14
            },
            data: ['类型1', '类型2', '类型3']
        },
        series: [{
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}人',
                textStyle: {
                  color: '#353535',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                  let num = colorArray.length;
                  return {
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                    }, {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                    }]
                  }
                },
                barBorderRadius: 70,
                borderWidth: 0,
                borderColor: '#333',
              }
            },
            barGap: '0%',
            barCategoryGap: '80%',
            data: [60, 132, 89]
        }]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initCharts()
  }
}
</script>

<style lang="scss" scoped>
</style>
