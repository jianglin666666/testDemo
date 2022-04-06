<template>
  <div id="father" ref="fa">
    <div
      id="box"
      ref="boxRef"
      @mousedown="move($event)"
      @mousewheel="mousewheel($event)"
    >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

// 注明此类为一个vue组件
@Component({
  components: {}
})
export default class dragMoveTest extends Vue {
  // 原有data中的数据在这里展开编写
  private positionX;
  private positionY;
  private big = 1;
  private small = 1;

  mounted() {}

  private move(e) {
    let odiv = e.target; //获取目标元素
    console.log("erer", odiv);
    //算出鼠标相对元素的位置
    let disX = e.clientX - odiv.offsetLeft;
    let disY = e.clientY - odiv.offsetTop;
    console.log("clientXY", e.clientX, e.clientY);
    console.log("offsetLR", odiv.offsetLeft, odiv.offsetTop);
    console.log("disXY", disX, disY);
    document.onmousemove = e => {
      //鼠标按下并移动的事件
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX;
      let top = e.clientY - disY;

      //绑定元素位置到positionX和positionY上面
      this.positionX = top;
      this.positionY = left;
      console.log("top、left", top, left);

      //移动当前元素
      odiv.style.left = left + "px";
      odiv.style.top = top + "px";
    };
    document.onmouseup = e => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
  private mousewheel(e) {
    console.log(e);
    if (e.deltaY > 0) {
      if (this.big >= 0.3) {
        this.big -= 0.2;
        (this.$refs.boxRef as any).style.transform = `scale(${this.big})`;
        this.small = this.big;
      } else {
        return;
      }
    } else {
      if (this.small <= 4) {
        this.small += 0.2;
        (this.$refs.boxRef as any).style.transform = `scale(${this.small})`;
        this.big = this.small;
      } else {
        return;
      }
    }
  }
}
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
}
.test-container {
  width: 100%;
  height: 100%;
}
.imgT {
  width: 60px;
  height: 30px;
  cursor: pointer;
  margin: 10px;
  position: absolute;
}
#box {
  width: 100px;
  height: 62px;
  /* background-color: aquamarine; */
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  background: url("../assets/1.jpg") no-repeat;
  background-size: contain;
}

#father {
  width: 600px;
  height: 500px;
  /* background-color: rgb(226, 117, 184); */
  position: relative;
}
img {
  width: 100%;
  height: 100%;
  cursor: move;
}
#scale {
  width: 10px;
  height: 10px;
  overflow: hidden;
  cursor: se-resize;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgb(122, 191, 238);
}
</style>
