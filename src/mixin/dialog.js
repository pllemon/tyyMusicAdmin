// 用于常规弹窗
import { mapState } from 'vuex'
export default {
    props: {
        mes: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            form: {},
            readonly: false,
            rules: {}
        }
    },
    created() {
        let mes = this.$common.numberToString(this.mes.data)
        this.form = Object.assign({}, this.form, mes)
    },
    methods: {
        close() {
            this.$emit('close')
        }
    },
    computed: {
        ...mapState({
            dict: state => state.dict
        })
    }
}
