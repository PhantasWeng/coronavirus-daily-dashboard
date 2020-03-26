<template>
  <div class="home">
    <div class="container">
      <div class="text-center py-32 text-white">
        <div v-if="selectedCountry" class="text-4xl font-bold">{{ selectedCountry.name }} 新冠病毒 每日追蹤</div>
        <div class="text-xs text-grey-dark">by Phantas Weng</div>
      </div>
      <div class="w-full md:w-1/3 mb-32 mx-auto">
        <v-select v-model="selectedCountry" :options="countries" label="name" class="bg-white">
          <template #selected-option="{ name, nativeName, }">
            <div class="flex-1 flex items-center">
              <div class="font-bold mr-16">{{ name }}</div>
              <div class="text-sm text-grey-darker">{{ nativeName }}</div>
            </div>
          </template>
          <template v-slot:option="option">
            <div class="flex">
              <div class="flex-1 flex">
                <div class="font-bold mr-16">{{ option.name }}</div>
                <div class="text-sm text-grey-darker">{{ option.nativeName }}</div>
              </div>
              <div class="flex-1 text-grey-dark">{{ option.alpha3Code }}</div>
            </div>
          </template>
        </v-select>
      </div>
      <div class="border-t border-b border-blue mb-88 flex flex-col items-center py-32 px-8">
        <div class="text-white text-2xl mb-16 text-center">
          <div class="mb-4">最新增加</div>
          <div class="text-xs text-blue"><i class="owl-circle-clock-o"></i>{{ sortedDate[0].date }}</div>
        </div>
        <div class="flex text-center">
          <div class="mr-8">
            <div class="mb-4 text-xl text-blue">確診</div>
            <div class="p-8 text-white bg-blue rounded-sm text-4xl text-center">{{ additionCount(0, 'confirmed') }}</div>
          </div>
          <div class="mr-8">
            <div class="mb-4 text-xl text-blue">死亡</div>
            <div class="p-8 text-white bg-orange rounded-sm text-4xl text-center">{{ additionCount(0, 'deaths') }}</div>
          </div>
          <div class="mr-8">
            <div class="mb-4 text-xl text-blue">治癒</div>
            <div class="p-8 text-white bg-green-dark rounded-sm text-4xl text-center">{{ additionCount(0, 'recovered') }}</div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-blue font-bold mb-16">歷史記錄</div>
        <template v-for="(item, index) in sortedDate">
          <div class="mb-8" :key="item.date">
            <div class="text-sm text-blue-light ml-4 mb-4"><i class="owl-circle-clock-o"></i>{{ item.date }}</div>
            <div class="border border-1 border-blue rounded-sm p-16 mb-16 inline-block">
              <div class="flex text-center">
                <div class="flex flex-col items-center mr-32 text-blue-light">
                  <div class="font-bold capitalize flex flex-col items-center mb-8">
                    <div class="mb-8">累計確診</div>
                    <div class="font-bold text-xs text-blue-dark">confirmed</div>
                  </div>
                  <div>
                    <span class="text-2xl">{{ item.data.confirmed }}</span>
                    <span v-if="additionCount(index, 'confirmed') > 0" class="text-xs font-bold text-red pl-4">(+{{ additionCount(index, 'confirmed')}})</span>
                  </div>
                </div>
                <div class="flex flex-col items-center mr-32 text-orange">
                  <div class="font-bold capitalize flex flex-col items-center mb-8">
                    <div class="mb-8">累計死亡</div>
                    <div class="font-bold text-xs text-blue-dark">deaths</div>
                  </div>
                  <div>
                    <span class="text-2xl">{{ item.data.deaths }}</span>
                    <span v-if="additionCount(index, 'deaths') > 0" class="text-xs font-bold text-red pl-4">(+{{ additionCount(index, 'deaths')}})</span>
                  </div>
                </div>
                <div class="flex flex-col items-center text-green">
                  <div class="font-bold capitalize flex flex-col items-center mb-8">
                    <div class="mb-8">累計治癒</div>
                    <div class="font-bold text-xs text-blue-dark">recovered</div>
                  </div>
                  <div>
                    <span class="text-2xl">{{ item.data.recovered }}</span>
                    <span v-if="additionCount(index, 'recovered') > 0" class="text-xs font-bold text-red pl-4">(+{{ additionCount(index, 'recovered')}})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      selectedCountry: {},
      data: []
    }
  },
  computed: {
    ...mapGetters({
      countries: 'countries'
    }),
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
    additionCount: function (index, type) {
      if (this.sortedDate[index] && this.sortedDate[index + 1]) {
        return this.sortedDate[index].data[type] - this.sortedDate[index + 1].data[type]
      }
    },
    getData: function (country) {
      console.log('getData')
      this.getByCountry(country).then(res => {
        this.data = res
      })
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
        console.log(val)
        this.getData(val.alpha3Code)
      },
      deep: true
    }
  }
}
</script>

<style lang="sass">
</style>
