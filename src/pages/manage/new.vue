<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="名称">
            <a-input v-model="form.title" />
        </a-form-model-item>
<!--        <a-form-model-item label="设备类型">-->
<!--            <a-select v-model="form.region" placeholder="please select your zone">-->
<!--                <a-select-option value="shanghai">-->
<!--                    Zone one-->
<!--                </a-select-option>-->
<!--                <a-select-option value="beijing">-->
<!--                    Zone two-->
<!--                </a-select-option>-->
<!--            </a-select>-->
<!--        </a-form-model-item>-->

<!--        <a-form-model-item label="设备状态">-->
<!--            <a-switch v-model="form.delivery" />-->
<!--        </a-form-model-item>-->
    <a-form-model-item label="等级设置">
            <a-tooltip title="设置数量，达到该数量之后进行分类">
                <a-icon type="question-circle-o" />
            </a-tooltip>

        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="危急">

                        <a-form-item
                                label="DEBUG"
                        >
                            <a-input-number   v-model="form.debugCount" />
                        </a-form-item>
                        <a-form-item
                                label="INFO"
                        >
                            <a-input-number  v-model="form.infoCount"  />
                        </a-form-item>
                        <a-form-item
                                label="ERROR"
                        >
                            <a-input-number   v-model="form.errorCount" />
                        </a-form-item>
                        <a-form-item
                                label="WARN"
                        >
                            <a-input-number  v-model="form.warnCount" />
                        </a-form-item>

                        <a-form-item
                                label="CRITICAL"
                        >
                            <a-input-number   v-model="form.criticalCount" />
                        </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="2" tab="故障" force-render>
                <a-form-item
                        label="DEBUG"
                >
                    <a-input-number   v-model="form.debugCount" />
                </a-form-item>
                <a-form-item
                        label="INFO"
                >
                    <a-input-number  v-model="form.infoCount"  />
                </a-form-item>
                <a-form-item
                        label="ERROR"
                >
                    <a-input-number   v-model="form.errorCount" />
                </a-form-item>
                <a-form-item
                        label="WARN"
                >
                    <a-input-number  v-model="form.warnCount" />
                </a-form-item>

                <a-form-item
                        label="CRITICAL"
                >
                    <a-input-number   v-model="form.criticalCount" />
                </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="3" tab="关注">
                <a-form-item
                        label="DEBUG"
                >
                    <a-input-number   v-model="form.debugCount" />
                </a-form-item>
                <a-form-item
                        label="INFO"
                >
                    <a-input-number  v-model="form.infoCount"  />
                </a-form-item>
                <a-form-item
                        label="ERROR"
                >
                    <a-input-number   v-model="form.errorCount" />
                </a-form-item>
                <a-form-item
                        label="WARN"
                >
                    <a-input-number  v-model="form.warnCount" />
                </a-form-item>

                <a-form-item
                        label="CRITICAL"
                >
                    <a-input-number   v-model="form.criticalCount" />
                </a-form-item>
            </a-tab-pane>
        </a-tabs>
    </a-form-model-item>
<!--        <a-form-item-->
<!--                label="DEBUG"-->
<!--        >-->
<!--            <a-input-number   v-model="form.debugCount" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--                label="INFO"-->
<!--        >-->
<!--            <a-input-number  v-model="form.infoCount"  />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--                label="ERROR"-->
<!--        >-->
<!--            <a-input-number   v-model="form.errorCount" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--                label="WARN"-->
<!--        >-->
<!--            <a-input-number  v-model="form.warnCount" />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--                label="CRITICAL"-->
<!--        >-->
<!--            <a-input-number   v-model="form.criticalCount" />-->
<!--        </a-form-item>-->
        <a-form-model-item label="备注">
            <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">
                新建
            </a-button>
            <a-button style="margin-left: 10px;">
                取消
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
  // eslint-disable-next-line no-unused-vars
  import formList from './components/formList'
  export default {
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        components:{
          formList
        },
        form: {
          criticalCount:'',
          debugCount:'',
          errorCount:'',
          infoCount:'',
          warnCount:'',
          desc: '',
        },
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!', this.form);
        this.axios({
          method: 'post',
          data:this.form,
          dataType: 'JSONP',
          url: '/api/api/warnManagement/'
        }).then(res => {
          this.List = res.data.data
          console.log(this.List)
        })
      },

    },
  };
</script>
