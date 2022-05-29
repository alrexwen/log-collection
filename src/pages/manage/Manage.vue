<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row >
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="ID"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" v-model="form.ID"/>
                            </a-form-item>
                        </a-col>
<!--                        <a-col :md="8" :sm="24" >-->
<!--                            <a-form-item-->
<!--                                    label="设备类型"-->
<!--                                    :labelCol="{span: 5}"-->
<!--                                    :wrapperCol="{span: 18, offset: 1}"-->
<!--                            >-->
<!--                                <a-input placeholder="请输入" />-->
<!--                            </a-form-item>-->
<!--                        </a-col>-->
                    </a-row>

                </div>
                <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="sreach">查询</a-button>
                     <a-button type="primary" >
                         <router-link to="/manage/new" > 新建</router-link>
    </a-button>

        </span>
            </a-form>
        </div>
        <div>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
            >
                <div slot="description" slot-scope="{text}">
                    {{text}}
                </div>
                <div slot="action" slot-scope="{text, record}">
                        <modal/>
                 <a @click="deleteRecord(record.key)">
                        <a-icon type="delete" />删除
                    </a>
                </div>
                <template slot="statusTitle">
                    <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                </template>
            </standard-table>
        </div>
    </a-card>
</template>

<script>
  import StandardTable from '@/components/table/StandardTable'
  import modal from "./components/modal";
  const columns = [
    {
      title: 'ID',
      dataIndex: "warnManagementId"
    },
    {
      title: '主机名',
      dataIndex: "title",
      scopedSlots: { customRender: 'name' }
    },
    {
      title: 'debug',
      dataIndex: "debugCount"
    },
    {
      title: 'info',
      dataIndex: "infoCount",
    },
    {
      title: 'error',
      dataIndex: "errorCount"

    },{
      title: 'warn',
      dataIndex: "warnCount"
    },{
      title: "critical",
      dataIndex: "criticalCount"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = [        {
    "warnManagementId": 1,
    "title": "报警管理标题1",
    "appID": 1,
    "infoCount": 10,
    "errorCount": 10,
    "warnCount": 10,
    "criticalCount": 10,
    "createTime": "2022-04-21 11:20:22"
  }
  ]

  export default {
    name: 'setting',
    components: {StandardTable,modal},
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: [],
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        number: {
          value: 11,
        },
        List:[],
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        form: {
          ID:'',
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    created() {
      this.getdate();//在html加载完成后进行，相当于在页面上同步显示后端数据

    },
    methods: {
      sreach(){
        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/warnManagement/'+this.form.ID,
        }).then(res => {
          this.List = [res.data.data]
          console.log(this.List)
        })
        console.log(this.form.ID)
      },

      getdate() {
        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/warnManagement/'
        }).then(res => {
          this.List = res.data.data
          console.log(this.List)
        })
        // this.axios({
        //   method: 'get',
        //   dataType: 'JSONP',
        //   url: '/api/warnManagement'
        // }).then(res => {
        //   this.data = res.data
        //   this.List = res.data.data
        //   //  console.log(this.List)
        //   for (let i = 0; i < this.List.length; i++) {
        //     // this.List[i].key = this.List[i].serial_id;
        //     this.List[i].create_time = getTime(JSON.stringify(this.List[i].create_time), 'yyyy-MM-dd hh:mm:ss');
        //     for (let j = 0; j < this.Lists.length; j++)
        //       if (this.Lists[j].warnManagementId === this.List[i].warnManagementId) {
        //         this.List[i].tags = this.Lists[j].label_name
        //       }
        //   }
        // })
        // this.data = this.List
      },
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

