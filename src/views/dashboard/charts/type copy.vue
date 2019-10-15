<template>
  <div class="chart-content">
    <div style="width:100%;height:300px" ref="chart"></div>
    <div class="charts-select">
      <el-select v-model="date" placeholder="请选择" size="mini" style="width:100px">
        <el-option
          v-for="item in dateSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
let color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec'];
export default {
  data() {
    return {
      chart: null,
      dateSelect: [{
        value: '',
        label: '全部'
      },{
        value: 1,
        label: '选项一'
      },{
        value: 2,
        label: '选项二'
      }
      ],
      date: '',
      record: [
        {value:336, name:'直接访问'},
        {value:310, name:'邮件营销啦啦'},
        {value:234, name:'联告'},
        {value:135, name:'视频广告'},
        {value:500, name:'搜索引擎'},
        {value:350, name:'搜索引擎1'},
        {value:250, name:'搜索引擎2'},
        {value:100, name:'搜索引擎3'},
        {value:350, name:'搜索引擎4'},
        {value:600, name:'搜索引擎5'}
      ]
    }
  },
  computed: {
    legendRecord() {
      let legendObj = {}
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
  methods: {
    initCharts () {
      const that = this
      this.chart = this.$echarts.init(this.$refs.chart)
      let option = {
        color: color,
        title : [{
            text: '同名数量统计',
            subtext: '纯属虚构',
            x:'left'
        },
        {
            text: '合计',
            subtext: this.totalNum,
            textStyle:{
                fontSize: 14,
                color:"#333"
            },
            subtextStyle: {
                fontSize: 24,
                color: '#333'
            },
            textAlign:"center",
            x: '40%',
            y: '38%',
        }],
        tooltip: {
            trigger: 'item',
            formatter:function (parms){
              var str = parms.marker+""+parms.data.name+"</br>"+
                "数量："+ parms.data.value+"</br>"+
                "占比："+ parms.percent+"%";
              return  str ;
            }
        },
        legend: {
            type:"scroll",
            orient: 'vertical',
            left:'70%',
            align:'left',
            top:'middle',
            textStyle: {
              color:'#8C8C8C'
            },
            height: 150,
            formatter: function(name) {
              return name + ' ' + that.legendRecord[name]
            },
        },
        series: [
          {
            name:'状态统计',
            type:'pie',
            radius: ['50%', '70%'],
            center: ['40%','50%'],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: that.record
          }
        ]
      }
      this.chart.setOption(option)
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
  }
}
</script>


