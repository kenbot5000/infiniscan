<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: {
    orderData: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      chartdata: {
        labels: ['test', 'tes', 'te', 't'],
        datasets: [{
          label: 'Recent Order Profits',
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
    const labels = [];
    const data = [];
    for (const order of this.orderData) {
      labels.push(Object.keys(order)[0]);
      data.push(Object.values(order)[0]);
    }
    this.chartdata.labels = labels;
    this.chartdata.datasets[0].data = data;

    // Chart generation
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style>

</style>
