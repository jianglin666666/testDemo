<template>
  <div class="test-container">
    {{message}} {{computedMsg}}
    <input type="text" v-model="data.name"/>
    <input type="button" value="点击触发父级方法" @click="bindSend"/>
    <input type="button" value="点击触发父级方法" @click="handleSend"/>
    <input type="button" value="点击触发父级方法" @click="bindSend2"/>
    <!-- <Hello></Hello> -->
    <div class="box" :style="{backgroundColor:getBgcolor()}">{{this.counter}}</div>
    <div class="box" :style="{backgroundColor:getBgcolor()}">{{this.counter}}</div>
    <el-select v-model="value1" multiple placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div ref="richText" class="rich-box" contenteditable='true' 
    @mouseup="editMouseUp"
    @blur="editBlur"
    >
      请输入
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import Hello from "./HelloWorld.vue";
// 注明此类为一个vue组件
@Component({
  components: {
    Hello
  }
})
export default class Test extends Vue {
  // 原有data中的数据在这里展开编写
 public message: string = "asd";
 private editable: Boolean = false;
 private counter: number = 0;
 public data: object = {
   name:'chengjianlin'
 };
 private options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }];
 private value1 = '';
 private timer = null;
 protected mounted(){
   console.log('执行了',this.counter)
   this.timer = setInterval(()=>{
     this.counter += 1
   },400)
 }
 private beforeDestroy () {
   clearInterval(this.timer)
   this.timer = null
 }
  //原有props中的数据展开编写
  @Prop({
    type: Number,
    default: 1,
    required: false
  })
  propA?: number
  @Prop()
  propB:string
  //原有computed
  public get computedMsg(){
      return '这里是计算属性' + this.message;
  }
  public set computedMsg(message:string){
  }
  //原有的watch属性
  @Watch('propA',{
      deep:true
  })
  public test(newValue:string,oldValue:string){
      console.log('propA值改变了' + newValue);
  }
  @Watch('data',{
      deep:true,
      immediate: true
  })
  //newValue、oldValue值一样
  public dataChange(newValue:string,oldValue:string){
      console.log('新值', newValue);
      console.log('旧值', oldValue);
  }
  // 以前需要给父级传值的时候直接方法中使用emit就行了，当前需要通过emit来处理
  @Emit()
  private bindSend():string{
    // this.$router.push({
    //   path:`/demoTest`
    // })
    this.$router.push({
      name: 'demoTest',
      params:{username:'James2022'}
    })
      return this.message
  }
  @Emit()
  private bindSend1(msg:string,love:string){
      // 如果不处理可以不写下面的，会自动将参数回传
    //   msg += 'love';
    //   return msg;
  }
  //原有放在methods中的方法平铺出来
  public handleSend():void {
      this.bindSend1(this.message,'love');
  }
  // 这里的emit中的参数是表明父级通过什么接受，类似以前的$emit('父级定义的方法')
  @Emit('test')
  private bindSend2(){
      console.log(this.value1)
      return '这个可以用test接受';
  }
  private getBgcolor(){
    let r = Math.floor(Math.random()*256)
    let g = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random()*256)
    return `rgba(${r},${g},${b},0.5)`
  }
  private editMouseUp(){
    if(!this.editable){
      this.editable = true
      let selection = window.getSelection()
      selection.removeAllRanges()
      selection.selectAllChildren((this.$refs.richText) as any)
    }
  }
  private editBlur(){
    this.editable = false
  }
}
</script>
<style>
  .box {
    width: 100px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 16px;
    color: #fff;
  }
  .rich-box {
    width: 250px;
    height: 40px;
    background: rgb(252, 242, 242);
    line-height: 40px;
    font-size: 16px;
    border: 1px dashed transparent;
  }
  .rich-box:hover {
    border: 1px dashed #ccc;
  }
</style>