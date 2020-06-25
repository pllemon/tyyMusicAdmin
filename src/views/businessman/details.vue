<template>
  <el-dialog :modal-append-to-body="false" title="商家详情" :visible="true" width="1000px" :before-close="handleClose">
    <el-tabs tab-position="top">
      <el-tab-pane label="基本信息">
        <div class="section detail-form flex" v-loading="loading">
          <el-form label-width="100px" class="flex1" style="padding-right:30px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="店铺名称:">
                  {{ message.name }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="联系方式:">
                  {{ message.phone }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所属区域:">
                  {{ message.region }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="详细地址:">
                  {{ message.address }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="申请时间:">
                  {{ message.creattime }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="店铺状态:">
                  {{ recordStatus[message.status]}}
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="message.bhremark">
                <el-form-item label="驳回原因:">
                  {{ message.bhremark }}
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="message.examine">
                <el-form-item label="审核时间:">
                  {{ message.examine }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form style="width:500px;padding-left: 30px;border-left:1px solid #ddd">
            <el-row>
              <el-col :span="12">
                <el-form-item label="门面图片:">
                  <gd-image :src="message.shopimg"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="宣传图片:">
                  <gd-image :src="message.businessimg"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照:">
                  <gd-image :src="message.goodsimg"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="分享图片:">
                  <gd-image :src="message.sharewximg"/>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="优惠商品">
        <goods-list :id="dialogMes.id" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { businessinfo } from '@/api/businessman'  
import GoodsList from '@/views/businessman/goods'

export default {
  components: {
    GoodsList
  },
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      message: {},
      loading: true
    }
  },

  created() {
    const that = this
    businessinfo({
      business_id: that.dialogMes.id
    }).then(response => {
      that.message = response.data
    }).finally(() => {
      that.loading = false
    })
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
  },
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      recordStatus: state => state.dict.recordStatus
    })
  }
}
</script>

<style scoped lang="scss">
.img-list img{
  width: 300px;
  height: 200px;
  border: 1px solid #f2f2f2;
  margin-right: 20px;
}

.section{
  margin-bottom: 40px;
  .section-title{
    margin-bottom: 15px;
  }
}

.master-list{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 32%;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    line-height: 1.5;
    margin-right: 2%;
    padding: 10px;
    box-sizing: border-box;
    &:nth-of-type(3n){
      margin-right: 0;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      background: #f2f2f2;
    }
  }
}
</style>
