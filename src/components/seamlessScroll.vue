<template>
  <div class="" style="padding: 50px;">
    <div class="page-example3" style="">
      <vue-seamless-scroll :data="listData" :class-option="defaultOption">
        <ul class="ul-scoll">
          <li v-for="(item, index) in listData" :key="index">
            <span class="title">{{ item.title }}：</span
            ><span class="date">{{ item.time }}</span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "Example3",
  // import引入的组件需要注入到对象中才能使用
  components: {
    vueSeamlessScroll
  },
  data() {
    // 这里存放数据
    return {
      listData: []
    };
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: 0.6, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  // 方法集合
  methods: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    for (let i = 0; i < 15; i++) {
      let j = {
        title: "无缝滚动第几条啊啊啊-" + i,
        time: "2020-04-10"
      };
      this.listData.push(j);
    }
  }
};
</script>

<style scoped lang="scss">
//@import url(); 引入公共css类
.page-example3 {
  width: 400px;
  height: 200px;
  overflow: hidden;
  border: 1px solid #283dff;
  .ul-scoll {
    li {
      margin: 6px;
      padding: 5px;
      background: rgba(198, 142, 226, 0.4);
    }
  }
}
</style>
