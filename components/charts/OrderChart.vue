<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data () {
    return {
      chartdata: {
        labels: ['test', 'tes', 'te', 't'],
        datasets: [{
          label: 'Test Chart',
          backgroundColor: 'rgb(150, 255, 150)',
          data: [1, 2, 1, 4]
        }],
        height: 100
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }

          }]
        }
      }
    };
  },
  mounted () {
    // Chart generation
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style>

</style>
