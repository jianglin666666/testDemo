<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a class="icon" @click="test">
       <img src="../assets/1.jpg" alt="">
    </a>
    <table-test> </table-test>
    <echarts-test></echarts-test>
  </div>
</template>

<script>
import TableTest from '@/components/TableTest.vue'
import EchartsTest from '@/components/EchartsTest'
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'About',
  components: {
    TableTest,
    MyTest,
    EchartsTest
  },
  methods:{
    test:function(){
      alert("hello")
    }
  }
}
</script>
<style>

.icon {
   background:url("../assets/1.jpg") no-repeat center top;
}
</style>