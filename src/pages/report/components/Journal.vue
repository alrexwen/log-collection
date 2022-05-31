<template>
    <a-card>
        <div>
            <standard-table
                    :columns="columns"
                    :dataSource="List"
                    :row-key="record=>record.logID"
                    :pagination='false'
                   />
        </div>
    </a-card>
</template>

<script>
  import StandardTable from '@/components/table/StandardTable'
  import XLSX from 'xlsx';

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

      // 导出复杂表头
//       handleExportMarketingList() {
//         require.ensure([], () => {
//           const {export_json_to_excel} = require('@/vendor/Export2Excel2');
//           //multiHeader数组里面添加的是一级表头的名称，要按顺序添加每个表头的的名称，如果遇到横向合并单元格的地方，合并了多少个单元格，就要留几个空字符串占位
//           const multiHeader = [
//             [
//               '日志编号', '应用名称', '内容', '日志等级', '应用环境', '服务器IP', '类名','时间',
//             ],
//           ];
//           //tHeader数组里面放的是二级表头的名称，也要按顺序添加每个表头的的名称，添加的时候要注意，如果是一级表头上下单元格合并地方，要用空字符串补上占位。
//           // const tHeader = [
//           //   '', '', '', '', '', '', '', '', '', '', '', '', 'Material', 'NRE', 'Cert', 'TTL', 'Material', 'NRE', 'Cert', 'TTL',
//           //   'Material', 'NRE', 'Cert', 'TTL', 'Material', 'NRE', 'Cert', 'TTL', 'Material', 'NRE', 'Cert', 'TTL', 'Material', 'NRE', 'Cert', 'TTL',
//           //   'Material', 'NRE', 'Cert', 'TTL', 'Material', 'NRE', 'Cert', 'TTL', '',
//           // ];
//           //filterVal数组里面放的是表头title对应的字段名称
//           const filterVal = ['logID', 'appName', 'content', 'level', 'appEnv', 'serverIp', 'errClass','createTime',];
// // this.cash是后端返回来的数组，用map方法遍历，这里你可以改你想要的数据，最后用return将每个字段一次返回就好啦
//           const list = this.List.map((item) => {
//
//
//             return {
//               logID: item.logID || null,
//               appName: item.appName || null,
//               content: item.content || null,
//               level: this.level || null,
//               appEnv: this.appEnv || null,
//               serverIp: this.serverIp || null,
//               errClass: item.errClass || null,
//               createTime: item.createTime || null,
//
//             }
//           });
//           // merges是进行所有表头的单元格合并，数组里面的每个元素的填写规则是：按从左往右的顺序依次填写，字母是指excel里面的第几列，数字表示第几行，如果是上下的单元格合并，就是按从上往下填写，比如'A1:A2'代表的是A列的第一个单元格和A列的第二个单元格合并，如果是左右的单元格合并，也是从左往右填写，同理，
//           // const merges = [
//           //   'A1:A2', 'B1:B2', 'C1:C2', 'D1:D2', 'E1:E2', 'F1:F2', 'G1:G2', 'H1:H2', 'I1:I2', 'J1:J2', 'K1:K2', 'L1:L2', 'M1:P1',
//           //   'Q1:T1', 'U1:X1', 'Y1:AB1', 'AC1:AF1', 'AG1:AJ1', 'AK1:AN1', 'AO1:AR1', 'AS1:AS2'
//           // ];
//           if(list) {
//             const data = this.formatJson(filterVal, list); // 生成json数据
//             export_json_to_excel({
//               multiHeader, // 这里是第一行的表头
//               // header: tHeader, // 这里是第二行的表头
//               data,
//               filename: 'Cash plan',  //这里填的是导出excel的名称
//               // merges,
//             });
//           } else {
//             alert("暂无无数据");
//           }
//         });
//       },
//       formatJson(filterVal, jsonData) {
//         return jsonData.map(v => filterVal.map(j => v[j]))
//       },
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
        XLSX.writeFile(wb, 'table.xlsx');
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

