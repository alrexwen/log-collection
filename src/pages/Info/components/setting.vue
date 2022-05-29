<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                   <a-row>
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
        <div>

            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
                    :row-key="record=>record.warnId"
            >
                <div slot="description" slot-scope="{text,record}">
                    <a @click="chack(record)">{{text}}</a>
                </div>
                <div slot="action">
<!--                     slot-scope="{text, record}">-->

                    <a style="margin-right: 8px">
                        <a-icon type="edit"/>编辑
                    </a>
<!--                    <a @click="deleteRecord(record.key)">-->
                        <a-icon type="delete" />删除
<!--                    </a>-->
                    <router-link to="/info/details" >详情</router-link>
                </div>
                <template slot="statusTitle">
                    <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                </template>
            </standard-table>
        </div>
    </a-card>
</template>

<script>
  // import { getTime } from '@/utils/getTime'
  import StandardTable from '@/components/table/StandardTable'
  const columns = [
    {
      title: 'ID',
      dataIndex: "warnId"
    },
    {
      title: '错误数量',
      dataIndex: "errorCount",
    },{
      title: '服务IP',
      dataIndex: "serverIp",
    },
    {
      title: '端口',
      dataIndex:"serverPort"
    },
    {
      title: '描述',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' }
    },
    {
      title: '时间',
      dataIndex: "createTime"
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const dataSource = [        {
    "warnId": 1,
    "warnManagementId": 1,
    "count": "123",
    "serverIp": "192.168.1.100",
    "serverPort": "8080",
    "description": "描述",
    "createTime": "2022-04-21T11:19:23"
  },
    {
      "warnId": 2,
      "warnManagementId": 1,
      "count": "20",
      "serverIp": "192.168.1.34",
      "serverPort": "443",
      "description": "描述2",
      "createTime": "2022-04-21T11:19:46"
    }
  ]


  export default {
    name: 'setting',
    components: {StandardTable},
    data() {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: [],
        List:[],
        Lists:[]
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    created() {
      this.getdate();//在html加载完成后进行，相当于在页面上同步显示后端数据

    },
    methods: {
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      chack(List) {
        //  const id = this.$route.params.List.asset_id;/info/details
        this.$router.push('/info/' + List.warnId + '/details')
        // console.log(List.asset_id)
      },
      getdate() {
        this.axios({
        method: 'get',
        dataType: 'JSONP',
        url: '/api/api/warnManagement'
      }).then(res => {
        this.data = res.data
        this.Lists = res.data.data
      })
        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/warn/'
        }).then(res => {
          this.List = res.data.data
          for (let i = 0; i < this.List.length; i++) {
            // this.List[i].key = this.List[i].serial_id;
            // this.List[i].create_time = getTime(JSON.stringify(this.List[i].create_time), 'yyyy-MM-dd hh:mm:ss');
            for (let j = 0; j < this.Lists.length; j++)
              if (this.Lists[j].warnManagementId === this.List[i].warnManagementId) {
                this.List[i].errorCount = this.Lists[j].errorCount
              }
          }
        })

        this.data = this.List
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

