<template>
  <div id="mapInstance" class="chart"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
// import "echarts/map/js/china";
const chinaJson = require("../assets/json/china.json");

@Component
export default class EchartsTest extends Vue {
  //"省、市、县、区不能省"
  private outname = [
    "南海诸岛",
    "新疆维吾尔自治区",
    "北京市",
    "天津市",
    "上海市",
    "重庆市",
    "河北省",
    "河南省",
    "云南省",
    "辽宁省",
    "黑龙江省",
    "湖南省",
    "安徽省",
    "山东省",
    "新疆省",
    "江苏省",
    "浙江省",
    "江西省",
    "湖北省",
    "广西壮族自治区",
    "甘肃省",
    "山西省",
    "内蒙古自治区",
    "陕西省",
    "吉林省",
    "福建省",
    "贵州省",
    "广东省",
    "青海省",
    "西藏自治区",
    "四川省",
    "宁夏省",
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区"
  ];
  //与地区一一对应
  private outvalue = [
    0,
    0,
    13,
    140,
    75,
    13,
    83,
    11,
    19,
    15,
    69,
    260,
    39,
    4,
    31,
    104,
    36,
    1052,
    33,
    347,
    9,
    157,
    22,
    4,
    18,
    5,
    2398,
    41,
    0,
    484,
    404,
    22,
    5,
    225,
    100
  ];
  private outdata = [];

  private max = 6000;
  private min = 10;
  private maxSize4Pin = 100;
  private minSize4Pin = 20;
  protected mounted() {
    this.drawMap();
  }
  private drawMap() {
    echarts.registerMap("中国", chinaJson);
    for (var i = 0; i < this.outname.length; i++) {
      this.outdata.push({
        name: this.outname[i],
        value: this.outvalue[i]
      });
    }
    let geoCoordMap = {};
    /*获取地图数据*/
    let mapFeatures = echarts.getMap("中国").geoJson.features;
    mapFeatures.forEach(function(v) {
      console.log("地图数据", v);
      // 地区名称
      let name = v.properties.name;
      // 地区经纬度
      geoCoordMap[name] = v.properties.center;
    });
    let convertData = function(outdata) {
      var res = [];
      for (var i = 0; i < outdata.length; i++) {
        var geoCoord = geoCoordMap[outdata[i].name];
        if (geoCoord) {
          res.push({
            name: outdata[i].name,
            value: geoCoord.concat(outdata[i].value)
          });
        }
      }
      return res;
    };
    // 基于准备好的dom，初始化echarts实例
    let testDiv: HTMLDivElement = document.getElementById(
      "mapInstance"
    ) as HTMLDivElement;
    let myChart = echarts.init(testDiv);
    // 绘制图表
    let option = {
      backgroundColor: "#0F1C3C",
      tooltip: {
        show: true,
        formatter: function(params) {
          // console.log(params.value)
          if (params.value > 0) {
            return (
              params.name +
              "&nbsp;&nbsp;&nbsp;" +
              params.value +
              "人&nbsp;&nbsp;"
            );
          } else {
            return "";
          }
        }
      },
      geo: {
        map: "中国",
        show: true,
        roam: true,
        // center: [105.97, 29.71],
        aspectScale:0.75,
        // zoom: 1,
        label: {
          emphasis: {
            show: false
          }
        },
        regions: [
          {
            name: "广东省",
            itemStyle: {
              areaColor: "red",
              color: "red"
            }
          }
        ],
        layoutSize: "100%",
        // itemStyle: {
        //   normal: {
        //     borderColor: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       0,
        //       1,
        //       [
        //         {
        //           offset: 0,
        //           color: "#00F6FF"
        //         },
        //         {
        //           offset: 1,
        //           color: "#53D9FF"
        //         }
        //       ],
        //       false
        //     ),
        //     borderWidth: 3,
        //     shadowColor: "rgba(10,76,139,1)",
        //     shadowOffsetY: 0,
        //     shadowBlur: 60
        //   }
        // }
         itemStyle: {
            normal: {
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#073684" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#061E3D" // 100% 处的颜色
                  }
                ]
              },
              borderColor: "#215495",
              borderWidth: 1
            },
            emphasis: {
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#073684" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#061E3D" // 100% 处的颜色
                  }
                ]
              }
            }
        },
      },
      series: [
        {
          type: "map",
          map: "中国",
          aspectScale: 0.75,
          // center: [105.97, 29.71],
          roam:true,
          geoIndex:0,
          //zoom:1.1,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // itemStyle: {
          //   normal: {
          //     areaColor: {
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: "#073684" // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "#061E3D" // 100% 处的颜色
          //         }
          //       ]
          //     },
          //     borderColor: "#215495",
          //     borderWidth: 1
          //   },
          //   emphasis: {
          //     areaColor: {
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: "#073684" // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "#061E3D" // 100% 处的颜色
          //         }
          //       ]
          //     }
          //   }
          // },
          data: this.outdata
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          rippleEffect: {
            brushType: "stroke"
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(5,80,151,0.2)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(5,80,151,0.8)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,108,255,0.7)"
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          label: {
            normal: {
              show: true,
              color: "#fff",
              fontWeight: "bold",
              position: "inside",
              formatter: function(para) {
                return "{cnNum|" + para.data.value[2] + "}";
              },
              rich: {
                cnNum: {
                  fontSize: 13,
                  color: "#D4EEFF"
                }
              }
            }
          },
          symbol: "circle",
          symbolSize: val => {
            if (val[2] === 0) {
              return 0;
            }
            var a =
              (this.maxSize4Pin - this.minSize4Pin) / (this.max - this.min);
            var b = this.maxSize4Pin - a * this.max;
            return a * val[2] + b * 1.2;
          },
          data: convertData(this.outdata),
          zlevel: 1
        }
      ]
    };
    myChart.clear();
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
    myChart.off('click');
    myChart.on('click',(params)=>{
        console.log(params.name,params)    
    })
  }
}
</script>

<style scoped>
.chart {
  width: 20rem;
  height: 15rem;
}
/* .chart {
  width: 700px;
  height: 550px;
} */
</style>
