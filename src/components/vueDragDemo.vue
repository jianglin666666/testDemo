<template>
    <div class="manbox">
        <div v-for="(rect, index) in rects" :key="index" style="width:100%;height:100%">
            <vue-drag-resize
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
                v-on:dragging="resizeNode($event, index)"
                v-on:resizing="resizeNode($event, index)"
            >
                <!-- <img src="../assets/1.jpg" height="100%" width="100%" /> -->
                <div :ref="`box${index+1}`" style="width:100%;height:100%;border:1px solid blue;text-align:center;line-height:150px;"
                 :style="{backgroundColor:getcolor(),color:'#fff'}">{{index + 1}}</div>
            </vue-drag-resize>
        </div>
        <button @click="exportJson" style="position:absolute;bottom:10px;left:50%;">导出JSON</button>
        <el-dialog
            v-dialogDrag
            title="导出数据"
            :close-on-click-modal="false"  
            :modal="false"
            :visible.sync="dialogVisible"
            width="30%">
            <div> 
              <el-input
                type="textarea"
                :autosize="{ minRows: 6,maxRows:8}"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
      dialogVisible: false,
      textarea:'',
      listWidth: 0,
      listHeight: 0,
      height:0,
      width:0,
      top:0,
      left:0,
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
        'active': false,
        'name':'one'
      },{
        'width': 200,
        'height': 150,
        'top': 50,
        'left': 50,
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
        'active': false,
        'name':'two'
      }]
    };
  },
  computed:{
    bgColor:function(){
      let r = Math.floor(Math.random()*256)
      let g = Math.floor(Math.random()*256)
      let b = Math.floor(Math.random()*256)
      return `rgb(${r},${g},${b})`  
    }
  },
  mounted() {
  },
  directives:{
    dialogDrag:{
       bind(el, binding, vnode, oldVnode) {
          const dialogHeaderEl = el.querySelector('.el-dialog__header')
          const dragDom = el.querySelector('.el-dialog')
          dialogHeaderEl.style.cursor = 'move'
          // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
          const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
          dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，获得鼠标在盒子内的坐标（鼠标在页面的坐标 减去 对话框的坐标），计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop
          // 获取到的值带px 正则匹配替换
          let styL, styT
          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
          } else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
          }
          document.onmousemove = function(e) {
            // 鼠标移动，用鼠标在页面的坐标 减去 鼠标在盒子里的坐标，获得模态框的left和top值
            // 通过事件委托，计算移动的距离
            const l = e.clientX - disX
            const t = e.clientY - disY
    
            // 移动当前元素
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`
    
            // 将此时的位置传出去
            // binding.value({x:e.pageX,y:e.pageY})
          }
    
          document.onmouseup = function(e) {
            //  鼠标弹起，移除鼠标移动事件
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
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
    
    //缩放、拖动的位置
    resizeNode(newRect, index) {
      this.rects[index].width = newRect.width
      this.rects[index].height = newRect.height
      this.rects[index].top = newRect.top
      this.rects[index].left = newRect.left
      console.log("changePosition",newRect,index,this.$refs.box1)
      if(index === 0){
        this.$refs.box1[0].style.lineHeight = newRect.height + 'px'
      }
      if(index === 1){
        this.$refs.box2[0].style.lineHeight = newRect.height + 'px'
      }
      // this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
      // this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
      // this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
      // this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
    },
    exportJson(){
      let strObj = ''
      strObj = JSON.stringify(this.rects,null,2) //JSON数据格式化
      console.log(strObj)
      this.dialogVisible = true
      this.textarea = strObj
    },
    getcolor(){
      let r = Math.floor(Math.random()*256)
      let g = Math.floor(Math.random()*256)
      let b = Math.floor(Math.random()*256)
      return `rgb(${r},${g},${b})`
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
  overflow: hidden;
}
</style>
