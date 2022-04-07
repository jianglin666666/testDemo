<template>
  <div class="father-box">
    <div style="width:60%">
      <scroll-demo></scroll-demo>
      <el-table
        :data="islist"
        ref="table"
        :header-cell-style="{'text-align':'center','color':'#fff','background':'rgba(44, 51, 65, 0.788)'}"
        :row-class-name="tableRowClassName"
        :max-height="tableHeight"
        @cell-mouse-enter="mouseover"
        @cell-mouse-leave="mouseout"
      >
        <el-table-column prop="date" label="日期" width="180" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"> </el-table-column>
        <el-table-column prop="address" label="地址" align="center"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import scrollDemo from "@/components/scrollDemo.vue";
export default {
  name: "demoTest",
  components: {
    scrollDemo
  },
  data() {
    return {
      tableHeight: 50,
      myTimer: null,
      islist:[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '张三',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '李四',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '陈留',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '小气',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '大毛',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '谢茂',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight = "280px";
      //50为预留el-table到浏览器底部的高度
    });
    this.roll();
    // this.roll2()
  },
  methods: {
    roll() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.table;
      // 拿到表格中承载数据的div元素
      const bodyWrapper = table.bodyWrapper;
      table.bodyWrapper.style.overflowY = 'hidden'
      
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      this.myTimer = setInterval(() => {
        // console.log(bodyWrapper.clientHeight,bodyWrapper.scrollTop, bodyWrapper.scrollHeight)
        // 元素自增距离顶部1像素
        bodyWrapper.scrollTop++;
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (
          bodyWrapper.clientHeight + bodyWrapper.scrollTop ==
          bodyWrapper.scrollHeight
        ) {
          // 重置table距离顶部距离
          bodyWrapper.scrollTop = 0;
        }
      }, 20);
    },
    roll2(){
       const table = this.$refs.table;
      // 拿到表格中承载数据的div元素
      const bodyWrapper = table.bodyWrapper;
      table.bodyWrapper.style.overflowY = 'hidden'
      this.myTimer = setInterval(this.scrollTable, 1000);
    },
    scrollTable(){
      var tmp = this.islist.shift();//删掉第一行数据并返回
      this.islist.push(tmp);//将第一行数据存到末尾
    },
    mouseover() {
      clearInterval(this.myTimer);
    },
    mouseout() {
      // this.roll2();
      this.roll();
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
    }
  }
};
</script>

<style>

.father-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-table .warning-row {
    background: rgba(207, 216, 236, 0.76);
  }

  .el-table .success-row {
    background: #9aa9c0af;
  }
</style>
