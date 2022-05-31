<template>
    <div style="background-color: white">
        <a-button  type="primary" @click="printContext" style="float: right;margin-right: 10px;margin-top: 5px">打印</a-button>
        <div ref="print" class="recordImg" id="print" style="width: 1200px;padding: 24px;margin: auto">
            <h1 style="text-align:center">报告</h1>
<!--            <span style="float: right;margin-right: 10px">{{time}}</span>-->
            <Journal/>
        <info/>

        </div>

    </div>
</template>

<script>
    // import $print from '../../plugins/Print'
    import info from "./components/info";
    import Journal from './components/Journal'
    const time=[]
    export default {
        data() {
            return {
                List:[],
              time,
                columns: [],
            };
        },
      components:{Journal,info},
        methods: {
            printContext () {
              // eslint-disable-next-line no-undef

              this.$print(this.$refs.print)
            },
        },
    };
</script>
<style>
    th.column-money,
    td.column-money {
        text-align: right !important;
    }
</style>
