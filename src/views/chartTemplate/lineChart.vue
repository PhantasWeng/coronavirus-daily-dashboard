<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chart-data', 'options'],
  mounted () {
    this.renderChart(this['chart-data'], this.options)
  }
}
</script>

<style>
</style>
