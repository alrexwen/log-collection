<template>
    <a-list item-layout="vertical" size="large"  :data-source="List">
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <img
                    slot="extra"
                    width="272"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            <a-list-item-meta >
                <a slot="title" :href="item.href">{{ item.appName }}</a>

<!--                <a-avatar slot="avatar" :src="item.avatar" />-->
            </a-list-item-meta>
            <a> <router-link to="/server/info" >详情</router-link></a>
            <br/>
            <span>服务描述</span>
            <br/>
            {{ item.description }}
            <a-descriptions >
                <a-descriptions-item label="服务名称">
                    {{item.appName}}
                </a-descriptions-item>
                <a-descriptions-item label="在线主机">
                    {{item.count}}
                </a-descriptions-item>
                <a-descriptions-item label="创建时间">
                    {{item.createTime}}
                </a-descriptions-item>
            </a-descriptions>
        </a-list-item>
    </a-list>
</template>
<script>
  const listData = [
    {
      "appID": 1,
      "appName": "应用1",
      "description": "也可以叫服务1",
      "count": 10,
      "createTime": "2022-04-21 11:11:20"
    },
    {
      "appID": 2,
      "appName": "应用2",
      "description": "服务2",
      "count": 256,
      "createTime": "2022-04-21 11:11:45"
    }

  ];
  // for (let i = 0; i < 23; i++) {
  //   listData.push({
  //     href: 'https://www.antdv.com/',
  //     title: `服务${i}`,
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     description:
  //       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //     content:
  //       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  //   });
  // }

  export default {
    data() {
      return {
        listData,
        List:[],

        actions: [
          { type: 'star-o', text: '156' },
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
        ],
      }; },
      created() {
        this.getdate();//在html加载完成后进行，相当于在页面上同步显示后端数据

      },
      methods: {

        getdate() {
          this.axios({
            method: 'get',
            dataType: 'JSONP',
            url: '/api/api/app/'
          }).then(res => {
            this.List = res.data.data
            console.log(this.List)
          })

        }
      }}
</script>
<style></style>
