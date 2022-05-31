<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                   <a-row>
                       <a-col :md="8" :sm="24" >
                           <a-form-item
                                   label="选择严重程度"
                                   :labelCol="{span: 5}"
                                   :wrapperCol="{span: 18, offset: 1}"
                           >
                               <a-select placeholder="请选择">
                                   <a-select-option value="1">所有</a-select-option>
                                   <a-select-option value="2">危急</a-select-option>
                                   <a-select-option value="3">故障</a-select-option>
                                   <a-select-option value="4">关注</a-select-option>

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
            <a-button type="primary" @click="exportData">导出文件</a-button>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :selectedRows.sync="selectedRows"
                    :row-key="record=>record.warnId"
                    tableLayout="auto"
                    pagination="false "
            >
                <div slot="description" slot-scope="{text,record}">
                    <a @click="chack(record)">{{text}}</a>
                </div>
<!--                <div slot="action">-->
<!--&lt;!&ndash;                     slot-scope="{text, record}">&ndash;&gt;-->

<!--                    <a style="margin-right: 8px">-->
<!--                        <a-icon type="edit"/>编辑-->
<!--                    </a>-->
<!--&lt;!&ndash;                    <a @click="deleteRecord(record.key)">&ndash;&gt;-->
<!--                        <a-icon type="delete" />删除-->
<!--&lt;!&ndash;                    </a>&ndash;&gt;-->
<!--                    <router-link to="/info/details" >详情</router-link>-->
<!--                </div>-->
<!--                <template slot="statusTitle">-->
<!--                    <a-icon @click.native="onStatusTitleClick" type="info-circle" />-->
<!--                </template>-->
            </standard-table>
        </div>
    </a-card>
</template>

<script>
  // import { getTime } from '@/utils/getTime'
  import StandardTable from '@/components/table/StandardTable'
  import XLSX from "xlsx";
  const columns = [
    {
      title: 'ID',
      dataIndex: "warnId"
    },
    {
      title: '名称',
      dataIndex: "name",
    },
    {
      title: '创建者',
      dataIndex: "user",
    },
    {
      title: '状态',
      dataIndex: "status",
    },
    {
      title: '严重程度',
      dataIndex: "severity",
    },
    {
      title: '配置',
      dataIndex: "title",
    },
    {
      title: '服务IP',
      dataIndex: "serverIp",
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
    // {
    //   title: '操作',
    //   scopedSlots: { customRender: 'action' }
    // }
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
                this.List[i].title = this.Lists[j].title
              }
          }
        })

        this.data = this.List
      },
      transData(columns, List) {
        const obj = columns.reduce((acc, cur) => {
          if (!acc.titles && !acc.keys) {
            acc.titles = [];
            acc.keys = [];
          }
          acc.titles.push(cur.title);
          acc.keys.push(cur.dataIndex);
          return acc;
        }, {});
        const tableBody = List.map(item => {
          return obj.keys.map(key => item[key]);
        });
        return [ obj.titles, ...tableBody ];
      },
      exportData() {
        const tableData = this.transData(
          this.columns,
          this.List
        );
        // 将一组 JS 数据数组转换为工作表
        const ws = XLSX.utils.aoa_to_sheet(tableData);
        // 创建 workbook
        const wb = XLSX.utils.book_new();
        // 将 工作表 添加到 workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // 将 workbook 写入文件
        XLSX.writeFile(wb, '告警.xlsx');
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

