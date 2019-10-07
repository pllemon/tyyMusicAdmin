<template>
  <el-dialog :modal-append-to-body="false" title="审核师傅" :visible="true" width="800px" :before-close="handleClose">
    <el-form ref="examineForm" :model="examineForm" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="examineForm.status">
          <el-radio label="1">通过</el-radio>
          <el-radio label="3">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="examineForm.status == '1'">
        <el-form-item label="师傅编号：">
          <el-input v-model="examineForm.sn" />
        </el-form-item>
        <el-form-item label="师傅头像：">
          <gd-upload 
            action='admin/uploadcraftsmanimg'
            :file="file"  
            @success="uploadSuccess"
          />
        </el-form-item>
      </template>
      <template v-if="examineForm.status == '3'">
        <el-form-item label="不通过原因：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            placeholder="请输入"
            v-model="examineForm.reject_reason"
          />
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, craftsmanexamine } from '@/api/master'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      file: {},
      examineForm: {
        status: '1',
        sn: '',
        craftsman_id: '',
        user_id: '',
        imglist: '',
        reject_reason: ''
      }
    }
  },
  created() {
    let that = this
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      that.examineForm.craftsman_id = response.data.info.id
      that.examineForm.user_id = response.data.info.user_id
    })
  },
  methods: {
    uploadSuccess(id) {
      this.examineForm.imglist = id
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      let that = this
      that.$refs.examineForm.validate((valid) => {
        if (valid) {
          console.log(that.examineForm)
          craftsmanexamine(that.examineForm).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  }
}
</script>