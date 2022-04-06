<template>
  <div id="aa" style="width:100%;height:500px;" ref="echarts">
  </div>

</template>

<script>
import echarts from "echarts";
export default {
  name: "EchartsTest",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("aa"));
      // 绘制图表
      myChart.setOption({
      title: {
        text: '同名数量统计',
        left: 'center',
        top: '5%'
    },
    series: [{
        name: '年龄',
        type: 'pie',
        radius: '55%',
        center: ['30%', '40%'],
        label: {
            show: true,
            position: 'inside',
            formatter: '{d}%'
        },
        data: [100,200,300]
    },
      {name: '学历',
        type: 'pie',
        radius: '35%',
        center: ['50%', '40%'],
        label: {
            show: true,
            position: 'inside',
            formatter: '{d}%'
        },
        data: [100,300,600],

    },
    {name: '年龄分布',
        type: 'pie',
        radius: '75%',
        center: ['70%', '40%'],
        label: {
            show: true,
            position: 'inside',
            formatter: '{d}%'
        },
        data: [100,200,300],

    }]
      });
    },
  },
};
</script>

<style scoped>
.aa {
  left: 1000px;
  position: relative;
}
</style>
