<template>
  <div class="home">
    <OwltingNav></OwltingNav>
    <div class="container pb-88">
      <div class="text-center py-32 text-white">
        <div v-if="selectedCountry" class="text-4xl font-bold flex flex-wrap items-end justify-center">
          <div class="flex flex-col items-center mr-8">
            <!-- <div v-show="selectedCountry.flag" class="text-xs text-grey-dark ml-4 flex items-center bg-white py-4 px-8 rounded-sm">
              <img :src="selectedCountry.flag" :alt="`flag-${selectedCountry.name}`" class="w-4 mr-4 block">
              <div>{{ selectedCountry.name }}</div>
            </div> -->
            <div class="mt-8">{{ selectedCountry.nativeName }}</div>
          </div>
          <div>新冠病毒 每日追蹤</div>
        </div>
        <div class="text-xs text-grey-dark mt-8"><a class="text-orange flex items-center justify-center" href="https://github.com/PhantasWeng/coronavirus-daily-dashboard"><img :src="githubIcon" class="w-4 mr-8" /><span>Phantas Weng</span></a></div>
      </div>
      <div class="w-full md:w-1/3 mb-32 mx-auto">
        <v-select v-model="selectedCountry" :options="countries" label="name" :filterBy="filterBy" class="bg-white">
          <template #selected-option="{ name, nativeName, flag }">
            <div class="flex-1 flex items-center">
              <div v-show="flag" class="w-4 mr-4">
                <img :src="flag" :alt="`flag-${name}`" class="w-full">
              </div>
              <!-- <div class="font-bold mr-16">{{ name }}</div> -->
              <div class="text-sm text-grey-darker mr-8">{{ nativeName }}</div>
              <div class="text-xs text-grey-darker"> - {{ name }}</div>
            </div>
          </template>
          <template v-slot:option="option">
            <div class="flex">
              <div class="flex-1 flex">
                <div class="nativeName font-bold mr-8">{{ option.nativeName }}</div>
                <div class="name text-sm text-grey-darker">- {{ option.name }}</div>
              </div>
              <!-- <div class="flex-1 text-grey-dark">{{ option.alpha3Code }}</div> -->
            </div>
          </template>
        </v-select>
      </div>
      <div v-if="sortedDate.length > 0" class="border-t border-blue mb-0 flex flex-col items-center py-32 px-8">
        <div class="text-sm text-blue mb-24 "><i class="owl-circle-clock-o"></i>更新至: {{ sortedDate[0].date }}</div>
        <div class="flex flex-col md:flex-row items-center justify-center">
          <div class="flex-grow flex-shrink border border-blue rounded-sm flex flex-col items-center py-16 px-16 mb-32 md:mb-0 md:mx-8">
            <div class="text-white text-lg mb-8 text-center">
              <div class="mb-4">最新增加</div>
            </div>
            <div class="flex text-center">
              <div class="mr-8">
                <div class="mb-4 text-lg text-blue mb-8">確診</div>
                <div class="p-8 text-white bg-blue rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="additionCount(0, 'confirmed') > -1">{{ additionCount(0, 'confirmed') }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
              <div class="mr-8">
                <div class="mb-4 text-lg text-blue mb-8">死亡</div>
                <div class="p-8 text-white bg-orange rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="additionCount(0, 'deaths') > -1">{{ additionCount(0, 'deaths') }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
              <div>
                <div class="mb-4 text-lg text-blue mb-8">治癒</div>
                <div class="p-8 text-white bg-green-dark rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="additionCount(0, 'recovered') > -1">{{ additionCount(0, 'recovered') }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow flex-shrink border border-blue-darker rounded-sm flex flex-col items-center py-16 px-16 md:mx-8">
            <div class="text-white text-lg mb-8 text-center">
              <div class="mb-4">累計</div>
            </div>
            <div class="flex text-center">
              <div class="mr-8">
                <div class="mb-4 text-lg text-blue mb-8">確診</div>
                <div class="p-8 text-white bg-blue rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="sortedDate[0].data.confirmed > 0">{{ sortedDate[0].data.confirmed }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
              <div class="mr-8">
                <div class="mb-4 text-lg text-blue mb-8">死亡</div>
                <div class="p-8 text-white bg-orange rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="sortedDate[0].data.deaths > 0">{{ sortedDate[0].data.deaths }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
              <div>
                <div class="mb-4 text-lg text-blue mb-8">治癒</div>
                <div class="p-8 text-white bg-green-dark rounded-sm text-4xl text-center h-16 flex items-center justify-center">
                  <template v-if="sortedDate[0].data.recovered > 0">{{ sortedDate[0].data.recovered }}</template>
                  <template v-else><i class="text-sm owl-load"></i></template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LineChart class="mt-24 flex-auto" :chart-data="dataCollection" :options="chartOptions"></LineChart>
      <div class="border-t border-blue pt-88 mt-88">
        <div class="text-center">
          <div class="text-2xl text-blue font-bold mb-16">歷史記錄</div>
          <template v-for="(item, index) in sortedDate">
            <div class="mb-8" :key="index">
              <div class="text-sm text-blue-light ml-4 mb-4"><i class="owl-circle-clock-o"></i>{{ item.date }}</div>
              <div class="border border-1 border-blue rounded-sm p-16 mb-16 inline-block">
                <div class="flex text-center">
                  <div class="flex flex-col items-center mr-32 text-blue-light">
                    <div class="font-bold capitalize flex flex-col items-center mb-8">
                      <div class="mb-8">累計確診</div>
                      <div class="font-bold text-xs text-blue-dark">confirmed</div>
                    </div>
                    <div class="h-8 flex items-center">
                      <span class="text-2xl">{{ item.data.confirmed }}</span>
                      <span v-if="additionCount(index, 'confirmed') > 0" class="self-end leading-md text-xs font-bold text-red ml-8">(+{{ additionCount(index, 'confirmed')}})</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-center mr-32 text-orange">
                    <div class="font-bold capitalize flex flex-col items-center mb-8">
                      <div class="mb-8">累計死亡</div>
                      <div class="font-bold text-xs text-blue-dark">deaths</div>
                    </div>
                    <div class="h-8 flex items-center">
                      <span class="text-2xl">{{ item.data.deaths }}</span>
                      <span v-if="additionCount(index, 'deaths') > 0" class="self-end leading-md text-xs font-bold text-red ml-8">(+{{ additionCount(index, 'deaths')}})</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-center text-green">
                    <div class="font-bold capitalize flex flex-col items-center mb-8">
                      <div class="mb-8">累計治癒</div>
                      <div class="font-bold text-xs text-blue-dark">recovered</div>
                    </div>
                    <div class="h-8 flex items-center">
                      <span class="text-2xl">{{ item.data.recovered }}</span>
                      <span v-if="additionCount(index, 'recovered') > 0" class="self-end leading-md text-xs font-bold text-red ml-8">(+{{ additionCount(index, 'recovered')}})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'

import OwltingNav from '@/components/OwltingNav'

import LineChart from '@/views/chartTemplate/lineChart'
import githubIcon from '@/assets/GitHub-Mark-Light-32px.png'
export default {
  name: 'Home',
  components: {
    OwltingNav,
    LineChart
  },
  data () {
    return {
      githubIcon: githubIcon,
      selectedCountry: {},
      data: [],
      dataCollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          // display: false
          labels: {
            usePointStyle: true,
            boxWidth: 4,
            fontColor: '#3ab3e2'
          }
        },
        title: {
          display: false
        },
        hover: {
          intersect: false
        },
        tooltips: {
          mode: 'point'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              display: false
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: '#07689f',
                drawBorder: false
              },
              ticks: {
                fontColor: '#3ab3e2'
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      countries: 'countries'
    }),
    dates: function () {
      const result = []
      _.each(this.data.result, (date, key) => {
        result.push(dayjs(key).format('YYYY-MM-DD'))
      })
      return result
    },
    confirmed: function () {
      const result = []
      _.each(this.data.result, date => {
        result.push(date.confirmed)
      })
      return result
    },
    deaths: function () {
      const result = []
      _.each(this.data.result, date => {
        result.push(date.deaths)
      })
      return result
    },
    recovered: function () {
      const result = []
      _.each(this.data.result, date => {
        result.push(date.recovered)
      })
      return result
    },
    sortedDate: function () {
      const reMap = _.map(this.data.result, (data, date) => {
        return {
          date,
          data
        }
      })
      return _.orderBy(reMap, 'date', 'desc')
    },
    totalConfirmed: function () {
      return this.sortedDate.length > 0 && this.sortedDate[0].data ? this.sortedDate[0].data.confirmed : null
    },
    totalDeaths: function () {
      return this.sortedDate.length > 0 && this.sortedDate[0].data ? this.sortedDate[0].data.deaths : null
    },
    totalRecovered: function () {
      return this.sortedDate.length > 0 && this.sortedDate[0].data ? this.sortedDate[0].data.recovered : null
    }
  },
  methods: {
    ...mapActions({
      getCountriesList: 'getCountriesList',
      getByCountry: 'getByCountry'
    }),
    filterBy: function (option, label, search) {
      console.log('val', option.nativeName, label, search)
      return (option.alpha2Code + option.alpha3Code + option.nativeName + label).toLowerCase().indexOf(search.replace('台', '臺').toLowerCase()) > -1
    },
    additionCount: function (index, type) {
      if (this.sortedDate[index] && this.sortedDate[index + 1]) {
        return this.sortedDate[index].data[type] - this.sortedDate[index + 1].data[type]
      }
    },
    getData: function (country) {
      // console.log('getData')
      this.getByCountry(country).then(res => {
        this.data = res
      })
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    fillData: function () {
      this.dataCollection = {
        labels: this.dates,
        datasets: [
          {
            label: '確診',
            borderColor: '#078abc',
            data: this.confirmed,
            pointHoverBackgroundColor: '#078abc',
            borderJoinStyle: 'round',
            pointRadius: 2,
            pointHoverRadius: 4,
            pointBorderWidth: 0,
            fill: false
          },
          {
            label: '死亡',
            borderColor: '#f7ac15',
            data: this.deaths,
            pointHoverBackgroundColor: '#f7ac15',
            borderJoinStyle: 'round',
            pointRadius: 2,
            pointHoverRadius: 4,
            pointBorderWidth: 0,
            fill: false
          },
          {
            label: '治癒',
            borderColor: '#8fc112',
            data: this.recovered,
            pointHoverBackgroundColor: '#8fc112',
            borderJoinStyle: 'round',
            pointRadius: 2,
            pointHoverRadius: 4,
            pointBorderWidth: 0,
            fill: false
          }
        ]
      }
    }
  },
  created () {
    this.getCountriesList().then(res => {
      const tw = _.find(res, item => item.alpha3Code === 'TWN')
      this.selectedCountry = tw
    })
    this.getData()
  },
  watch: {
    selectedCountry: {
      handler: function (val) {
        // console.log(val)
        this.getData(val.alpha3Code)
      },
      deep: true
    },
    sortedDate: {
      handler: function (val) {
        this.fillData()
      },
      deep: true
    }
  }
}
</script>

<style lang="sass">
.vs__dropdown-option.vs__dropdown-option--highlight
  @apply bg-blue
  .name, .nativeName
    @apply text-white
</style>
