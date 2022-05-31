<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row >
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="应用名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="应用环境"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="日志等级"
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
                    <a-row v-if="advanced">
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="日期"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-date-picker style="width: 100%" placeholder="请选择日期" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="类名"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="服务器名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="内容"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
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
                    :row-key="record=>record.logID"
                   >
                <div slot="content" slot-scope="{text,record}">
                   <a @click="chack(record)">{{text}}</a>
                </div>
<!--                <a slot="content" slot-scope="text,record"-->
<!--                   @click="chack(record)"-->
<!--                >-->
<!--                    {{ text }}-->
<!--                </a>-->
            </standard-table>
        </div>
    </a-card>
</template>

<script>
  import StandardTable from '@/components/table/StandardTable'
  import XLSX from "xlsx";
  const columns = [
    {
      title: '日志编号',
      dataIndex: "logID"
    },
    {
      title: '应用名称',
      dataIndex: "appName",
    },
    {
      title: '内容',
      dataIndex: 'content',
      scopedSlots: { customRender: 'content' }
    },
    {
      title: '日志等级',
      dataIndex: 'level',

    },
    {
      title: '应用环境',
      dataIndex: 'appEnv',
    },
    {
      title: '服务器IP',
      dataIndex: "serverIp",
    },
    {
      title: '类名',
      dataIndex: "errClass",
    },

    {
      title: '时间',
      dataIndex: 'createTime',
    },

  ]

  const dataSource = [
    {
      "logID": 1,
      "appID": 1,
      "appName": "应用1",
      "content": "应用1的内容",
      "level": "WARN",
      "appEnv": "线上环境",
      "serverIp": "192.168.1.100:8650",
      "errClass": "NullPointerError",
      "requestID": 1,
      "createTime": "2022-04-21 11:13:02"
    },
    {
      "logID": 2,
      "appID": 1,
      "content": "应用1的log2",
      "level": "WARN",
      "appName": "应用1",
      "appEnv": "线上环境",
      "serverIp": "192.168.1.101:8888",
      "errClass": "NumberFormatError",
      "requestID": 2,
      "createTime": "2022-04-21 11:13:52"
    },
    {
      "logID": 3,
      "appID": 2,
      "appName": "应用2",
      "content": "应用2的logID为3",
      "level": "CRITICAL",
      "appEnv": "线上环境",
      "serverIp": "192.168.1.99:8443",
      "errClass": "ResourceNorFoundError",
      "requestID": 3,
      "createTime": "2022-04-21 11:15:20"
    }

  ]

  export default {
    name: 'Journal',
    components: {StandardTable},
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: dataSource,
        selectedRows: [],
        List:[],
        Lists:[],
        data:[],
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    created(){
      this.getdate();//在html加载完成后进行，相当于在页面上同步显示后端数据

    },
    methods: {
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      // chack(List){
      chack(List){
        //  const id = this.$route.params.List.asset_id;
        this.$router.push('/query/'+List.logID+'/info')
        // this.$router.push('/query/info')
        // console.log(List)
      },
      getdate() {

        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/app'
        }).then(res => {
          this.data = res.data
          this.Lists = res.data.data
           // console.log(res.data,1)

        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/log/'
        }).then(res => {
          this.List = res.data.data
          console.log(this.List)
          for (let i = 0; i < this.List.length; i++) {
            // this.List[i].key = this.List[i].serial_id;
            // this.List[i].create_time = getTime(JSON.stringify(this.List[i].create_time), 'yyyy-MM-dd hh:mm:ss');
            for (let j = 0; j < this.Lists.length; j++)
              if (this.Lists[j].appID === this.List[i].appID) {
                this.List[i].appName = this.Lists[j].appName
              }
          }
        })
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
        XLSX.writeFile(wb, '日志.xlsx');
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

