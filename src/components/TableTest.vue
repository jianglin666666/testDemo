<template>
  <div>
    <el-card class="box-card"  v-waterMarker="{text:'cjl版权所有',textColor:'rgba(180, 180, 180, 0.8)'}">
      <div slot="header" class="clearfix">
        <span>表格</span>
      </div>
      <div class="content">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
            @expand-change="toggleRowExpansion"
            @row-click="rowClick"
            row-key="id"
            :expand-row-keys="expandList"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="id"> </el-table-column>
            <el-table-column label="商品名称" prop="name"> </el-table-column>
            <el-table-column label="描述" prop="desc"> </el-table-column>
            <el-table-column label="操作" prop="operate">
              <template slot-scope="scope">
                <el-button size="small" @click="queryDetail">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
    <el-dialog
      v-dialogDrag
      title="提示"
      :close-on-click-modal="false"  
      :modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      expandList: [],
      dialogVisible:false,
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      tableTitle: "整体"
    };
  },
  methods: {
    toggleRowExpansion(row, expand) {
      console.log(row, expand, this.expandList);
      if (expand.length) {
        this.expandList = [row.id];
      } else {
        this.expandList = [];
      }
    },
    rowClick(row, column, even) {
      console.log(row, column, even);
    },
    queryDetail() {
      this.dialogVisible = true
    },
    addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
      let can = document.createElement('canvas')
      parentNode.appendChild(can)
      can.width = 200
      can.height = 150
      can.style.display = 'none'
      let cans = can.getContext('2d')
      cans.rotate((-20 * Math.PI) / 180)
      cans.font = font || '16px Microsoft JhengHei'
      cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
      cans.textAlign = 'left'
      cans.textBaseline = 'Middle'
      cans.fillText(str, can.width / 10, can.height / 2)
      parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }
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
    },
    waterMarker:{
      bind(el, binding,vnode){
        //函数里面第三个参数vnode 它的vnode.context就是当前的vm实例
        let that = vnode.context 
        that.addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
      }
    }
  }
};
</script>

<style>
/* 鼠标移入*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f19944 !important;
  color: #fff;
}

/* 鼠标选中*/
.el-table__body tr.current-row > td {
  background-color: #f19944 !important;
  color: #fff;
}
</style>
