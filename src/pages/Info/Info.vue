<template>
    <div>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="报警设置">
               <setting/>
            </a-tab-pane>
<!--            <a-tab-pane key="2" tab="报警记录" force-render>-->
<!--                <record/>-->
<!--            </a-tab-pane>-->

        </a-tabs>
    </div>
</template>
<script>
    import setting from "./components/setting";
    // import record from "./components/record";
  export default {
    name: "Info",
    components:{
      setting,
      // record
    },
    data() {
      return {};
    },
    methods: {
      callback(key) {
        console.log(key);
      },
    },
  };
</script>


