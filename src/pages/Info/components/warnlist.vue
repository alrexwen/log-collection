<template>
    <a-descriptions title="报警详情" bordered>
        <a-descriptions-item label="名称" :span="3">
            Cloud Database
        </a-descriptions-item>

        <a-descriptions-item label="时间" :span="3">
            2022-04-24 18:00:00
        </a-descriptions-item>

        <a-descriptions-item label="级别" :span="2">
            <a-badge status="processing" text="warn" />
        </a-descriptions-item>
        <a-descriptions-item label="所属服务">
            <router-link to="/server/info" >服务1</router-link>
        </a-descriptions-item>
<!--        <a-descriptions-item label="Discount">-->
<!--            $20.00-->
<!--        </a-descriptions-item>-->
<!--        <a-descriptions-item label="Official Receipts">-->
<!--            $60.00-->
<!--        </a-descriptions-item>-->
        <a-descriptions-item label="详细内容">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
        </a-descriptions-item>
    </a-descriptions>
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
          url: '/api/api/warn/' + this.$route.params.id
        }).then(res => {
          this.List = res.data.data
          this.otherData = res.otherData
          console.log(this.List)

        })
      },
    }
  }
</script>

<style scoped>

</style>
