<template>
    <div class="manbox">
      <vue-drag-resize
        v-for="(rect, index) in rects"
        :key="index"
        :w="rect.width"
        :h="rect.height"
        :x="rect.left"
        :y="rect.top"
        :parentW="listWidth"
        :parentH="listHeight"
        :axis="rect.axis"
        :isActive="rect.active"
        :minw="rect.minw"
        :minh="rect.minh"
        :isDraggable="rect.draggable"
        :isResizable="rect.resizable"
        :parentLimitation="rect.parentLim"
        :snapToGrid="rect.snapToGrid"
        :aspectRatio="rect.aspectRatio"
        :z="rect.zIndex"
        :contentClass="rect.class"
        v-on:activated="activateEv(index)"
        v-on:deactivated="deactivateEv(index)"
        v-on:dragging="changePosition($event, index)"
        v-on:resizing="changeSize($event, index)"
      >
        <img src="../assets/1.jpg" height="100%" width="100%" />
      </vue-drag-resize>
    </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  name: "vueDragDemo",
  components: {
    VueDragResize
  },
  data() {
    return {
      listWidth: 0,
      listHeight: 0,
      rects: [{
        'width': 200,
        'height': 150,
        'top': 10,
        'left': 10,
        'draggable': true,
        'resizable': true,
        'minw': 100,
        'minh': 100,
        'axis': 'both',
        'parentLim': true,
        'snapToGrid': false,
        'aspectRatio': false,
        'zIndex': 1,
        'color': '#EF9A9A',
        'active': false
      }]
    };
  },
  mounted() {
  },
  methods: {
    activateEv(index) {
      console.log("activateEv",index)
      // this.$store.dispatch('rect/setActive', {id: index});
    },
    // 当前缩放的元素索引
    deactivateEv(index) {
      console.log("deactivateEv",index)
      // this.$store.dispatch('rect/unsetActive', {id: index});
    },
    
    // 拖动的位置
    changePosition(newRect, index) {
      console.log("changePosition",newRect,index)
      // this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
      // this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
      // this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
      // this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
    },
    // 改变拉伸的大小
    changeSize(newRect, index) {
      console.log("changeSize",newRect,index)
      // this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
      // this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
      // this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
      // this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
    }
  }
};
</script>
<style>
.vdr.active:before {
  outline: none
}

.manbox {
  width: 100%;
  height: 450px;
  border: 1px solid red;
  position: relative;
}
</style>
