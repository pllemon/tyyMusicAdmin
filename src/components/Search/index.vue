<template>
  <el-form :inline="true" :model="form" size="mini" class="common-search">
    <el-form-item label="筛选:">
    </el-form-item>
    <el-form-item>
      <el-select 
        v-model="form.timeType" 
        placeholder="选择时间"
        style="width:120px"
        clearable
      >
        <el-option
          v-for="item in timeTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.timeType == 1">
      <el-date-picker 
        v-model="form.year" 
        type="year" 
        placeholder="选择年份" 
        format="yyyy年"
        value-format="yyyy"
        style="width:120px"
      />
    </el-form-item>
    <el-form-item v-if="form.timeType == 2">
      <el-date-picker
        v-model="form.month"
        type="month"
        style="width:120px"
        value-format="yyyy-MM"
        placeholder="选择月份"
      />
    </el-form-item>
    <el-form-item prop="areaCode" >
      <el-cascader
        ref="areaCascader"
        v-model="form.areaCode"
        :options="options"
        :props="{ checkStrictly: true }"
        placeholder="区域"
        clearable
        style="width:200px"
      />
    </el-form-item>
    <el-form-item>
      <el-select v-model="form.network_id" style="width:200px" placeholder="网点" clearable>
        <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { areaJson } from '@/utils/area.js'
export default {
  data() {
    return {
      form: {
        year: '',
        month: '',
        network_id: '',
        areaCode: [],
        district: '',
        city: '',
        province: '',
        timeType: '',
      },
      networkList: [],
      options: areaJson,

      timeTypeOptions: [{
        value: 3,
        label: '近期'
      }, {
        value: 1,
        label: '某年'
      }, {
        value: 2,
        label: '某月'
      }]
    }
  },
  created() {
    this.common.getAllNetwork(this)
    this.form = this.globalSearch
  },
  watch: {
    form: {
      handler(val) {
        let startTime = ''
        let endTime = ''
        if (val.timeType == 3) {
          startTime = this.$moment().subtract('days', 45).format('YYYY-MM-DD 00:00:00');
          endTime = this.$moment().format('YYYY-MM-DD 23:59:59')
          this.year = ''
          this.month = ''
        } else if (val.timeType == 1 && val.year) {
          startTime = this.$moment(val.year, 'YYYY').startOf('year').format("YYYY-MM-DD HH:mm:ss")
          endTime = this.$moment(val.year, 'YYYY').endOf('year').format("YYYY-MM-DD HH:mm:ss")
        } else if (val.timeType == 2 && val.month) {
          startTime = this.$moment(val.month, 'YYYY-MM').startOf('month').format("YYYY-MM-DD HH:mm:ss")
          endTime = this.$moment(val.month, 'YYYY-MM').endOf('month').format("YYYY-MM-DD HH:mm:ss")
        } 
        val.startTime = startTime
        val.endTime =endTime

        val.province = val.areaCode[0]
        val.city = val.areaCode[1]
        val.district = val.areaCode[2]
        this.$store.commit('user/SET_SEARCH', val)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'globalSearch'
    ])
  }
}
</script>

<style lang="scss">
.common-search{
  display: flex;
  justify-content: center;
  .el-form-item{
    margin-bottom: 0;
  }
}
</style>
