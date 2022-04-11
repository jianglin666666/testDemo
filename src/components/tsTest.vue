<template>
  <div class="test-container">
    {{message}} {{computedMsg}}
    <input type="text" v-model="data.name"/>
    <input type="button" value="点击触发父级方法" @click="bindSend"/>
    <input type="button" value="点击触发父级方法" @click="handleSend"/>
    <input type="button" value="点击触发父级方法" @click="bindSend2"/>
    <!-- <Hello></Hello> -->
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
 public data: object = {
   name:'chengjianlin'
 };
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
  public dataChange(newValue:string,oldValue:string){
      console.log('data值改变了', newValue);
  }
  // 以前需要给父级传值的时候直接方法中使用emit就行了，当前需要通过emit来处理
  @Emit()
  private bindSend():string{
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
      return '这个可以用test接受';
  }
}
</script>