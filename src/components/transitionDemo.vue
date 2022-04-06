<template>
  <!-- typeof(text().val.tag) != 'undefined' ? text().val.tag : textArr[0].tag -->
  <!-- typeof text().val.title != "undefined"? text().val.title: textArr[0].title -->
  <div>
    <div class="textBox">
      <transition name="slide">
        <p class="text" :key="text().id">
          <el-tag type="warning">{{ filterData(text().val) }}</el-tag>
          {{ filterData2(text().val) }}
        </p>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

// 注明此类为一个vue组件
@Component({
  components: {}
})
export default class TransitionDemo extends Vue {
  private textArr = [
    { tag: "精彩推荐", title: "0 第一条公告111111111111111" },
    { tag: "热门推荐", title: "1 第23条公告嘎嘎嘎嘎嘎嘎灌灌灌灌灌" },
    { tag: "精彩推荐", title: "2 第3条公告嘎嘎嘎嘎嘎嘎灌灌灌灌灌" },
    { tag: "公司公告", title: "3 第2条公告嘎嘎嘎嘎嘎嘎灌灌灌灌灌" },
    { tag: "热门推荐", title: "4 第2333条公告嘎嘎嘎嘎嘎嘎灌灌灌灌灌" }
  ];
  private number = 0;

  mounted() {
    this.startMove();
  }
  private text() {
    return {
      id: this.number,
      val: this.textArr[this.number]
    };
  }
  startMove() {
    // eslint-disable-next-line
    let timer = setTimeout(() => {
      if (this.number === 5) {
        this.number = 0;
      }
      if (this.number != 5) {
        this.number += 1;
      }
      this.startMove();
    }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
    console.log("====>", this.text());
  }
  private filterData(data){
      if(typeof(data.val != 'undefined')){
          return data.tag
      }
  }
   private filterData2(data){
      if(typeof(data.title != 'undefined')){
          return data.title
      }
  }
}
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
}
.textBox {
  width: 100%;
  height: 40px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
}
.text {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(20px) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-20px) scale(0.8);
  opacity: 0;
}
</style>
