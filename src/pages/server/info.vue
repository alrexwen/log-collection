<template>
<div>
    <a-col :span="8">
        <chart-card :loading="loading" :title="$t('在线主机')" total="189,345">
            <a-tooltip :title="$t('introduce')" slot="action">
                <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
                <mini-area />
            </div>
            <div slot="footer">{{$ta('日均在线主机', 'p')}}<span> 123,4</span></div>
        </chart-card>
    </a-col>
    <a-col :span="8">
        <chart-card :loading="loading" :title="$t('报警次数')" total=" 189,345">
            <a-tooltip :title="$t('introduce')" slot="action">
                <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
                <mini-bar />
            </div>
            <div slot="footer">{{$t('日均报警次数')}} <span>60</span></div>
        </chart-card>
    </a-col>
    <a-col :span="8">
        <chart-card :loading="loading" :title="$t('报警次数')" total=" 189,345">
            <a-tooltip :title="$t('introduce')" slot="action">
                <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
                <mini-bar />
            </div>
            <div slot="footer">{{$t('日均报警次数')}} <span>60</span></div>
        </chart-card>
    </a-col>
    <a-col :span="12">
        <a-card :loading="loading" :bordered="false" :title="$t('占比')">
            <sales-data />
            <!--          <a-radio-group slot="extra" style="margin: -12px 0">-->
            <!--            <a-radio-button value="a">{{$t('all')}}</a-radio-button>-->
            <!--            <a-radio-button value="b">{{$t('online')}}</a-radio-button>-->
            <!--            <a-radio-button value="c">{{$t('stores')}}</a-radio-button>-->
            <!--          </a-radio-group>-->
        </a-card>
    </a-col>
    <a-col :span="12">
        <a-card :loading="loading" :bordered="false" :title="$t('错误统计')">
            <hot-search />
        </a-card>
    </a-col>
</div>
</template>

<script>
    import MiniBar from "../../components/chart/MiniBar";
  import ChartCard from "../../components/card/ChartCard";
  import SalesData from './components/SalesData'
  import HotSearch from "../dashboard/analysis/HotSearch";
  export default {
    name: "info",
    components:{
      SalesData,ChartCard,HotSearch,MiniBar
    },
    data () {
      return {
        loading: false
      }
    },
  }
</script>

<style scoped>

</style>
