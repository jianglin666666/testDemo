<template>
  <ul class="sv-timeline">
    <li class="sv-timeline-item" v-for="(item,index) in dataList" :key="index">
        <div class="sv-timeline-item__tail"></div>
        <div class="sv-timeline-item__node sv-timeline-item__node--normal sv-timeline-item__node--">
            <div></div>
            <!---->
        </div>
        <!---->
        <div class="sv-timeline-item__wrapper">
            <!---->
            <div class="sv-timeline-item__timestamp is-bottom">{{item.year}}</div>
            <div class="sv-timeline-item__content"> 
                {{item.value}}
            </div>
        </div>
    </li>
</ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

// 注明此类为一个vue组件
@Component({
  components: {}
})
export default class timeLine extends Vue {
  private dataList = [{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  },{
      year:'2015',
      value:'安徽省分行-张三-同意'
  }]
  created() {}
  mounted() {}
}
</script>

<style scoped>
.sv-timeline {
  margin: 0;
  font-size: 14px;
  list-style: none;
}
.sv-timeline-item {
  position: relative;
  padding-bottom: 26px;
}
.sv-timeline-item__tail {
  position: absolute;
  left: 5px;
  /* height:100%;
    	*/
  border-left: 2px solid rgb(11, 189, 135);
  top: 13px;
  bottom: 0;
}
.sv-timeline-item__node--primary {
  background-color: #409eff;
}
.sv-timeline-item__node--large {
  left: -2px;
  width: 14px;
  height: 14px;
}
.sv-timeline-item__content {
  color: #303133;
}
.sv-timeline-item__timestamp.is-bottom {
  color: #01c198;
  font-size: 14px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}
.sv-timeline-item__timestamp {
  color: #909399;
  line-height: 1;
  font-size: 13px;
}
.sv-timeline-item__wrapper {
  position: relative;
  padding-left: 22px;
  top: -2px;
}
.sv-timeline-item__node--normal {
  left: -1px;
  width: 12px;
  height: 12px;
}
.sv-timeline-item__node {
  position: absolute;
  border: rgb(11, 189, 135) 1px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sv-timeline-item__node > div {
  width: 8px;
  height: 8px;
  background-color: rgb(11, 189, 135);
  border-radius: 50%;
}
.sv-timeline-item__wrapper {
  display: flex;
}
</style>
