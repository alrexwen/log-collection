<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="主机名">
            <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="设备类型">
            <a-select v-model="form.region" placeholder="please select your zone">
                <a-select-option value="shanghai">
                    Zone one
                </a-select-option>
                <a-select-option value="beijing">
                    Zone two
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="设备状态">
            <a-switch v-model="form.delivery" />
        </a-form-model-item>
    <a-form-model-item label="日志等级设置">
            <a-tooltip title="设置报警数量，达到该数量之后对日志进行分类">
                <a-icon type="question-circle-o" />
            </a-tooltip>
    </a-form-model-item>
        <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="INFO"
                :validate-status="number.validateStatus"
        >
            <a-input-number :min="8" :max="12" :value="number.value" @change="handleNumberChange" />
        </a-form-item>
        <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="ERROR"
                :validate-status="number.validateStatus"
        >
            <a-input-number :min="8" :max="12" :value="number.value" @change="handleNumberChange" />
        </a-form-item>
        <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="WARN"
                :validate-status="number.validateStatus"
        >
            <a-input-number :min="8" :max="12" :value="number.value" @change="handleNumberChange" />
        </a-form-item>
        <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="DEBUG"
                :validate-status="number.validateStatus"
        >
            <a-input-number :min="8" :max="12" :value="number.value" @change="handleNumberChange" />
        </a-form-item>
        <a-form-model-item label="Activity form">
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
  function validatePrimeNumber(number) {
    if (number === 11) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'The prime between 8 and 12 is 11!',
    };
  }
  export default {
    data() {
      return {
        number: {
          value: 11,
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!', this.form);
      },
      handleNumberChange(value) {
        this.number = {
          ...validatePrimeNumber(value),
          value,
        };
      },
    },
  };
</script>
