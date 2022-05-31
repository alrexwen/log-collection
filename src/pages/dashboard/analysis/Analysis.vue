<template>
  <div class="analysis">
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
<!--        <chart-card :loading="loading" :title="$t('totalSales')" total="￥ 189,345">-->
          <chart-card :loading="loading" :title="$t('所有事件')" total="45">
<!--            错误数量-->
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
<!--          <div slot="footer">{{$ta('日均错误量', 'p')}}<span> 234.56</span></div>-->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('Windows事件')" total="34">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
<!--            <mini-area />-->
          </div>
<!--          <div slot="footer">{{$ta('Windows事件', 'p')}}<span> 23</span></div>-->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('报警次数')" total=" 25">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
<!--              {{$t('日均报警次数')}} <span>6</span>-->
            <mini-bar />
          </div>
<!--          <div slot="footer"></div>-->
        </chart-card>
      </a-col>
        <a-col :sm="24" :md="12" :xl="6" @click="getPrint">
            <chart-card :loading="loading" >
                <a-tooltip :title="$t('introduce')" slot="action">
                    <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                    <h1>查看报告</h1>
                    <!--              {{$t('日均报警次数')}} <span>6</span>-->
<!--                    <mini-bar />-->
                </div>
            </chart-card>
        </a-col>
    </a-row>
    <a-card :loading="loading" style="margin-top: 24px" :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" :tab="$t('日志趋势数据')" key="1" >
            <a-row>
                <MiniArea :style="{height: '256px'}"/>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

  </div>
</template>

<script>
import ChartCard from '../../../components/card/ChartCard'
import MiniArea from '../../../components/chart/MiniArea'
import MiniBar from '../../../components/chart/MiniBar'
// import MiniProgress from '../../../components/chart/MiniProgress'
// import Bar from '../../../components/chart/Bar'
// import RankingList from '../../../components/chart/RankingList'
// import HotSearch from './HotSearch'
// import SalesData from './SalesData'
import Trend from '../../../components/chart/Trend'

const rankList = []

export default {
  name: 'Analysis',
  i18n: require('./i18n'),
  data () {
    return {
      rankList,
      loading: true
    }
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)
  },
  components: {   MiniBar,  ChartCard,Trend, MiniArea
  },
  methods:{
    getPrint(){
      this.$router.push('/report')
    }
  }
}
</script>

<style lang="less" scoped>
  .extra-wrap{
    .extra-item{
      display: inline-block;
      margin-right: 24px;
      a:not(:first-child){
        margin-left: 24px;
      }
    }
  }
  @media screen and (max-width: 992px){
    .extra-wrap .extra-item{
      display: none;
    }
  }
  @media screen and (max-width: 576px){
    .extra-wrap{
      display: none;
    }
  }

</style>
