<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <echarts-test> </echarts-test> -->
    <div>
      <!-- <echarts-test ref="h2" @click.native="clikFunc"> </echarts-test> -->
      <echarts-test ref="h2"> </echarts-test>
      <!-- <my-test></my-test> -->
      <table-test></table-test>
      <hello-world-new> </hello-world-new>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorldNew from "@/components/HelloWorld.vue";
import MyTest from "@/components/Mytest";
import TableTest from "@/components/TableTest.vue";
import EchartsTest from "@/components/EchartsTest";

export default {
  name: "Home",
  components: {
    HelloWorldNew,
    MyTest,
    TableTest,
    EchartsTest
  },
  mounted: function() {
    const vm = this;
    vm.$nextTick(() => {});
  },

  methods: {
    clikFunc() {
      console.log("this is started");
    }
  }
};
</script>

<style scoped>
.bb {
  top: 200px;
  left: 600px;
  position: relative;
}
</style>
