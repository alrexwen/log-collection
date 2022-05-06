<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row >
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="选择应用名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-select placeholder="请选择">
                                    <a-select-option value="1">所有</a-select-option>
                                    <a-select-option value="2">INFO</a-select-option>
                                    <a-select-option value="3">ERROR</a-select-option>
                                    <a-select-option value="4">WARN</a-select-option>
                                    <a-select-option value="5">DEBUG</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                    </a-row>

                </div>
                <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
            </a-form>
        </div>

    </a-card>
</template>

<script>
  // import StandardTable from '@/components/table/StandardTable'

  export default {
    name: 'ErrorInfo',
    // components: {StandardTable},
    data () {
      return {
        advanced: true,
        selectedRows: []
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    methods: {
      deleteRecord(key) {
        this.dataSource = this.dataSource.filter(item => item.key !== key)
        this.selectedRows = this.selectedRows.filter(item => item.key !== key)
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      remove () {
        this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
        this.selectedRows = []
      },
      onClear() {
        this.$message.info('您清空了勾选的所有行')
      },
      onStatusTitleClick() {
        this.$message.info('你点击了状态栏表头')
      },
      onChange() {
        this.$message.info('表格状态改变了')
      },
      onSelectChange() {
        this.$message.info('选中行改变了')
      },
      addNew () {
        this.dataSource.unshift({
          key: this.dataSource.length,
          no: 'NO ' + this.dataSource.length,
          description: '这是一段描述',
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 4,
          updatedAt: '2018-07-26'
        })
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .search{
        margin-bottom: 54px;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block
    }
    .operator{
        margin-bottom: 18px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>


