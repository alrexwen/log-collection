<template>
    <div style="background-color: white;padding: 5px">
        <a-descriptions title="详情" bordered>
        <a-descriptions-item label="名称" :span="3">
            {{List.name}}
        </a-descriptions-item>
        <a-descriptions-item label="创建者">
            {{List.user}}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
            {{List.createTime}}
        </a-descriptions-item>


        <a-descriptions-item label="严重程度" :span="2">
            <a-badge status="processing"  />
            {{List.severity}}
        </a-descriptions-item>
        <a-descriptions-item label="描述">
            {{List.description}}
        </a-descriptions-item>
    </a-descriptions>

        <a-descriptions title="参与者" bordered>
            <a-descriptions-item label="进程名称" :span="3">
                {{List.process}}
            </a-descriptions-item>
            <a-descriptions-item label="怀疑">
                {{List.doubt}}
            </a-descriptions-item>
            <a-descriptions-item label="实体">
                {{List.entity}}
            </a-descriptions-item>
        </a-descriptions>
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="来源项">
                <a-list size="large" bordered :data-source="ListForm">
                    <a-list-item slot="renderItem" slot-scope="item">
                        {{ item }}
                    </a-list-item>

                </a-list>
            </a-tab-pane>

            <a-tab-pane key="2" tab="活动日志">
                <a-timeline>
                    <a-timeline-item>事件创建：admin成功创建了{{List.name}}事件。</a-timeline-item>

                </a-timeline>
            </a-tab-pane>
        </a-tabs>
    </div>

</template>
<script>
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  export default {
    name: "info",
    data(){
      return{
        List:[],
        ListForm:[],
        data,
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
          this.ListForm.push(res.data.data.source.split(','))
          this.ListForm  = this.ListForm[0]
          console.log(this.List)

        })
      },
    }
  }
</script>

<style scoped>

</style>
