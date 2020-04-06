<template>
  <el-form :inline="true" :model="form" size="mini" class="common-search">
    <el-form-item label="筛选:">
    </el-form-item>
    <el-form-item>
      <el-date-picker 
        v-model="form.year" 
        type="year" 
        placeholder="年份" 
        format="yyyy年"
        value-format="yyyy"
      />
    </el-form-item>
    <el-form-item>
      <el-select v-if="form.year" v-model="form.month" placeholder="月份" clearable>
        <el-option
          v-for="item in months"
          :key="item"
          :label="item + '月'"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="areaCode" >
      <el-cascader
        ref="areaCascader"
        v-model="form.areaCode"
        :options="options"
        placeholder="区域"
      />
    </el-form-item>
    <el-form-item>
      <el-select v-model="form.network_id" placeholder="网点" clearable>
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
        areaCode: []
      },
      networkList: [],
      months: [],
      options: areaJson,
    }
  },
  created() {
    this.common.getAllNetwork(this)
    for (var i = 1 ; i < 13; i++) {
      this.months.push(i.toString().padStart(2, '0'))
    }
    this.form = this.globalSearch
  },
  watch: {
    form: {
      handler(val) {
        let startTime = ''
        let endTime = ''
        if (!val.year) {
          val.month = ''
        }
        if (val.year && !val.month) {
          startTime = this.$moment(val.year, 'YYYY').startOf('year').format("YYYY-MM-DD HH:mm:ss")
          endTime = this.$moment(val.year, 'YYYY').endOf('year').format("YYYY-MM-DD HH:mm:ss")
        } else if (val.year && val.month) {
          startTime = this.$moment(val.year + '-' + val.month, 'YYYY-MM').startOf('month').format("YYYY-MM-DD HH:mm:ss")
          endTime = this.$moment(val.year + '-' + val.month, 'YYYY-MM').endOf('month').format("YYYY-MM-DD HH:mm:ss")
        }
        val.startTime = startTime
        val.endTime =endTime
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
  padding: 8px;
  display: flex;
  justify-content: center;
  .el-form-item{
    margin-bottom: 0;
  }
}
</style>
