// 用于数据的添加、详情、编辑
import { mapState } from 'vuex'
export default {
    props: {
        mes: {
            type: Object,
            default: () => {
                return {
                    data: {},
                    type: 0
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            form: {},
            readonly: false,
            rules: {},
            updateType: {
                0: '添加',
                1: '详情',
                2: '编辑'
            }
        }
    },
    created() {
        let mes = this.$common.numberToString(this.mes.data)
        this.form = Object.assign({}, this.form, mes)
        this.readonly = this.mes.type == 1
    },
    methods: {
        close() {
            this.$emit('close')
        },

        // 新增或编辑
        updateSingle() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.beforeUpdate) {
                        let beforeRes = this.beforeUpdate()
                        if (beforeRes === false) {
                            return false
                        }
                    }
                    this.loading = true
                    this.api.updateSingle(this.form).then(res => {
                        this.$emit('close', {
                            'notify': true,
                            'reload': true
                        })
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    },
    computed: {
        ...mapState({
            dict: state => state.dict
        })
    }
}
