<template>
    <a-card>
        <div>

            <a-table
                    :columns="columns"
                    :dataSource="List"
                    :row-key="record=>record.warnId"
                    :pagination='false'
            >
            </a-table>
        </div>
    </a-card>
</template>

<script>
  // import { getTime } from '@/utils/getTime'
  // import StandardTable from '@/components/table/StandardTable'
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
      title: '服务IP',
      dataIndex: "serverIp",
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '时间',
      dataIndex: "createTime"
    },
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
    // components: {StandardTable},
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

