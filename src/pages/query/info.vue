<template>
    <div>
        <h1>日志详情</h1>
        <a-descriptions title="请求者" layout="vertical" bordered>
            <a-descriptions-item label="IP地址" >
<!--                135.125.11.160-->
                            {{List.originIp}}
            </a-descriptions-item>
            <a-descriptions-item label="端口" :span="1">
<!--                51592-->
                            {{List.originPort}}
            </a-descriptions-item>

            <a-descriptions-item label="地理位置" :span="1">
<!--                香港-->
                            {{List.originLocation}}
            </a-descriptions-item>

<!--            <a-descriptions-item label="运营商" :span="1">-->

<!--                &lt;!&ndash;            {{List.asset_duty}}&ndash;&gt;-->
<!--            </a-descriptions-item>-->
            <a-descriptions-item label="时间" >

                            {{List.createTime}}
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="事件描述" layout="vertical" bordered>
            <a-descriptions-item label="详情" >
<!--                疑似包涵shell标题-->
                            {{List.requestContent}}
            </a-descriptions-item>

        </a-descriptions>
        <a-descriptions title="请求数据" layout="vertical" bordered>
            <a-descriptions-item label="详情" >
                            {{otherData}}
            </a-descriptions-item>

        </a-descriptions>
<!--        <a-descriptions title="响应数据" layout="vertical" bordered>-->
<!--            <a-descriptions-item label="详情" >-->
<!--                &lt;!&ndash;            {{List.asset_name}}&ndash;&gt;-->
<!--            </a-descriptions-item>-->

<!--        </a-descriptions>-->
    </div>

</template>

<script>
  // import { getTime } from '@/utils/getTime'
  // const List = [
  //   {
  //     "requestID": 1,
  //     "originIp": "8.8.8.8",
  //     "originPort": "1234",
  //     "originLocation": "美国 蒙大拿州",
  //     "requestContent": "www.fw.com/adaw.  {\"status\":true,\"code\":0,\"message\":null,\"data\":[{\"keyId\":1,\"key\":\"2Q2OPuV33pTdRg0GUvnpgg==\",\"deprecateTime\":\"2023-03-14T13:54:08\",\"abandonTime\":\"2024-03-14T13:54:11\",\"createTime\":\"2022-03-14T13:54:14\"}],\"otherData\":{}}",
  //     "createTime": "2022-04-21T11:16:42"
  //   }
  //   ]
  export default {
    name: "info",
    data(){
      return{
        List:[],
        data: {
          "requestID": 1,
          "originIp": "8.8.8.8",
          "originPort": "1234",
          "originLocation": "美国 蒙大拿州",
          "requestContent": "www.fw.com/adaw.  {\"status\":true,\"code\":0,\"message\":null,\"" +
            "data\":[{\"keyId\":1,\"key\":\"2Q2OPuV33pTdRg0GUvnpgg==\",\"deprecateTime\":\"2023-03-14T13:54:08\",\"abandonTime\":\"2024-03-14T13:54:11\",\"createTime\":\"2022-03-14T13:54:14\"}]," +
            "\"otherData\":{}}",
          "createTime": "2022-04-21 11:16:42"
        },
        tag:[],
        otherData:''
      }
    },
    mounted() {
      this.update();
    },
    methods: {
      update() {
        this.axios({
          method: 'get',
          dataType: 'JSONP',
          url: '/api/api/request/' + this.$route.params.id
        }).then(res => {
          this.List = res.data.data
          this.otherData = res.otherData
          console.log(this.List)
          // this.List.createTime = getTime(JSON.stringify(this.List.createTime), 'yyyy-MM-dd hh:mm:ss');
          // this.tag = this.List.label_id
          // {
          //   this.axios({
          //     method: 'get',
          //     dataType: 'JSONP',
          //     url: '/api/asset_label/' + this.tag
          //   }).then(res => {
          //     this.tag = res.data
          //   })
          // }
        })
        // console.log(this.tag)
      },
    }
  }
</script>

<style scoped>

</style>
