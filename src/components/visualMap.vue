<template>
  <div style="display:flex;justify-content:center;background:#fff">
    <div style="cursor:pointer" @click="goBack" v-if="backFlag">返回</div>
    <div id="myChart" style="width:700px;height:550px;"></div>
    <div style="margin-top:30px;">
      <el-input type="number" v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
// import {aa} from '../assets/json/china';
import { Component, Prop, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
import "echarts/map/js/china";
const chinaJson = require("../assets/json/china.json");
const beijingJson = require("../assets/json/beijing.json");
const anhuiJson = require("../assets/json/anhui.json");
const hefeiJson = require("../assets/json/hefei.json");
const baoheJson = require("../assets/json/baohe.json");

@Component
export default class EchartsTest extends Vue {
  private input = ''
  private outname = [
    "吉林省",
    "辽宁省",
    "广东省",
    "黑龙江省",
    "内蒙古自治区",
    "北京市",
    "安徽省",
    "河南省",
    "云南省",
    "新疆省",
    "河北省",
    "台湾省",
    "青海省",
    "西藏省",
    "江苏省",
    "海南省"
  ];
  private outvalue = [
    107,
    149,
    120,
    11,
    118,
    6,
    6,
    125,
    4,
    2,
    2,
    2,
    2,
    2,
    110,
    122
  ];
  private BeijingName = ["西城区", "东城区", "丰台区", "大兴区", "怀柔区"];
  // private cityName = ['合肥市','安庆市','六安市','芜湖市','池州市','亳州市','蚌埠市']
  private cityName = [
    "包河区",
    "政务区",
    "肥东县",
    "肥西县",
    "长丰县",
    "庐江县",
    "蜀山区"
  ];
  private cityValue = [23, 84, 105, 42, 77, 90, 30];
  private outdata = [];
  private cityOutData = [];
  private backFlag = false;
  protected mounted() {
    // for (var i = 0; i < this.outname.length; i++) {
    //   this.outdata.push({
    //     name: this.outname[i],
    //     value: this.outvalue[i],
    //     code:'10010'
    //   });
    // }
    this.drawMap(this.outdata, "china", chinaJson);
    this.chartClickMethod();
  }
  private drawMap(mapData, mapName, mapJson) {
    // 基于准备好的dom，初始化echarts实例
    echarts.registerMap(mapName, mapJson);
    /*获取地图数据*/
    let mapFeatures = echarts.getMap(mapName).geoJson.features;
    mapFeatures.forEach(function(v) {
      console.log("地图数据", v);
    });
    let testDiv: HTMLDivElement = document.getElementById(
      "myChart"
    ) as HTMLDivElement;
    let myChart = echarts.init(testDiv);
    // 绘制图表
    let option = {
      tooltip: {
        show: true,
        formatter: function(params) {
          if (params.value) {
            return (
              "&nbsp;&nbsp;" +
              params.name +
              "&nbsp;&nbsp;&nbsp;" +
              params.value +
              "个&nbsp;&nbsp;"
            );
          } else {
            return (
              "&nbsp;&nbsp;" + params.name + "&nbsp;&nbsp;&nbsp;0个&nbsp;&nbsp;"
            );
          }
        }
      },
      visualMap: {
        min: 0,
        max: 180,
        calculable: true,
        colorLightness: [0.8, 100],
        itemWidth: 10,
        itemHeight: 89,
        left: "10%",
        bottom: "30%",
        text: ["高", "低"],
        textStyle: {
          color: "#666666",
          fontSize: 13
        },
        inRange: {
          color: ["#a7e2fe", "#1e90ff", "#004cff", "#3979be", "#004571"]
        },
        outOfRange: {
          show: true
        }
      },
      geo: {
        map: mapName,
        show: true,
        roam: true,
        label: {
          normal: {
            show: true,
            position: "center"
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#D9EEFF",
            borderColor: "#fff",
            borderWidth: 1
          },
          emphasis: {
            areaColor: "#9da9d8"
          }
        },
        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              normal: {
                opacity: 0
              }
            },
            label: {
              show: true
            }
          }
        ]
      },
      graphic: {
        elements: [
          {
            type: "image",
            name: "提醒",
            zlevel: 5,
            style: {
              image: require("../assets/警示.png"),
              width: 10,
              height: 10
            },
            top: "41%",
            left: "61%"
          }
        ]
      },
      series: [
        {
          type: "map",
          map: mapName,
          aspectScale: 0.75,
          roam: true,
          geoIndex: 0,
          //zoom:1.1,
          label: {
            normal: {
              formatter: function(para) {
                return "{name|" + para.name + "}";
              },
              rich: {
                cnNum: {
                  fontSize: 11,
                  color: "#333333",
                  align: "center"
                },
                name: {
                  fontSize: 11,
                  color: "#333333",
                  align: "center",
                  lineHeight: 20
                }
              },
              //formatter: '{b}',
              color: "#333333",
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#D9EEFF",
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              areaColor: "#FFAE00"
            }
          },
          data: mapData
        }
      ]
    };
    myChart.clear();
    myChart.setOption(option);
  }
  private chartClickMethod() {
    let testDiv: HTMLDivElement = document.getElementById(
      "myChart"
    ) as HTMLDivElement;
    let myChart = echarts.init(testDiv);
    myChart.off("click");
    myChart.on("click", params => {
      console.log(params.name, params);
      for (var i = 0; i < this.cityName.length; i++) {
        this.cityOutData.push({
          name: this.cityName[i],
          value: this.cityValue[i]
        });
      }
      this.backFlag = true;
      this.drawMap(this.cityOutData, params.name, baoheJson);
    });
  }
  private goBack() {
    this.backFlag = false;
    this.drawMap(this.outdata, "china", chinaJson);
  }
}
</script>

<style scoped>
.aa {
  left: 1000px;
  position: relative;
}
</style>
