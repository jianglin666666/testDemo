<template>
  <div style="">
    <div
      id="myChart"
      style="width:50%;height:500px; display:inline-block"
      ref="echarts"
    ></div>
    <div
      id="myChart2"
      style="width:50%;height:500px; display:inline-block"
      ref="echarts"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as echarts from "echarts";

@Component
export default class EchartsTest extends Vue {
  private choosedMap = {};
  private chartData = [
    {
      name: "20岁",
      value: 100
    },
    {
      name: "30岁",
      value: 200
    },
    {
      name: "40岁",
      value: 300
    }
  ];
  protected mounted() {
    for (let i = 0; i < this.chartData.length; i++) {
      this.choosedMap[this.chartData[i].name] = "closed";
    }
    this.drawLine();
    this.test();
  }
  private drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let testDiv: HTMLDivElement = document.getElementById(
      "myChart"
    ) as HTMLDivElement;
    let myChart = echarts.init(testDiv);
    let testDiv2: HTMLDivElement = document.getElementById(
      "myChart2"
    ) as HTMLDivElement;
    let myChart2 = echarts.init(testDiv2);
    // 绘制图表

    myChart.setOption({
      title: {
        text: "同名数量统计",
        left: "center",
        top: "5%"
      },
      graphic: {
        elements: [
          {
            type: "image",
            name: "label1",
            zlevel: 5,
            style: {
              image: require('../assets/警示.png')
            },
            top: "20%",
            left: "40%"
          }
        ]
      },
      series: [
        {
          name: "年龄",
          type: "pie",
          radius: "55%",
          center: ["30%", "40%"],

          label: {
            show: true,
            position: "inside",
            formatter: "{d}%"
          },
          data: this.chartData,
          emphasis: {
            // scale:false
          }
        }
      ]
    });

    myChart2.setOption({
      title: {
        text: "联动",
        left: "center",
        top: "5%"
      },
      graphic: [
        {
          type: "group",
          left: "10",
          top: "10",
          children: [
            {
              type: "image",
              name: "label1",
              zlevel: 5,
              style: {
                image: require('../assets/警示.png')
              },
              top: "20%",
              left: "40%"
            }
          ]
        }
      ],
      series: [
        {
          name: "测试",
          type: "pie",
          radius: "55%",
          center: ["30%", "40%"],
          label: {
            show: true,
            position: "inside",
            formatter: "{d}%"
          },
          data: [80, 100, 200]
        }
      ]
    });
  }
  private test() {
    let site = true;
    let testDiv: HTMLDivElement = document.getElementById(
      "myChart"
    ) as HTMLDivElement;
    let myChart = echarts.init(testDiv);
    let testDiv2: HTMLDivElement = document.getElementById(
      "myChart2"
    ) as HTMLDivElement;
    let myChart2 = echarts.init(testDiv2);
    myChart.on("click", params => {
      console.log("params", params);

      for (let i = 0; i < this.chartData.length; i++) {
        if (params.name == this.chartData[i].name) {
          myChart.dispatchAction({
            type: "highlight",
            name: params.name
          });
        } else {
          myChart.dispatchAction({
            type: "downplay",
            name: this.chartData[i].name
          });
        }
      }
      // if(this.choosedMap[params.name] == 'closed'){
      //      myChart.dispatchAction({
      //          type: "highlight",
      //          name:params.name
      //   });
      //   this.choosedMap[params.name] = 'open';
      //   return;
      // }

      // if(this.choosedMap[params.name] == 'open'){
      //     myChart.dispatchAction({
      //         type: "downplay",
      //         dataIndex: params.dataIndex
      //     });
      //     this.choosedMap[params.name] = 'closed';
      //     return;
      // }
    });
  }
}
</script>

<style scoped>
.aa {
  left: 1000px;
  position: relative;
}
</style>
