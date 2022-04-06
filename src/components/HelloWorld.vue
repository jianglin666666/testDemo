<template>
  <div class="hello">
    <h1 ref="header">{{ msg }}</h1>
    <div id="app">
      <a href="http://www.baidu.com" @click.prevent="test4">test</a>
      <el-button @click.prevent.self="visible = true">Button</el-button>
      <!-- <a class="" @click="test"></a> -->
      <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
      </el-dialog>
    </div>
    <div>
      <h3 v-for="count in data" :key="count">{{ count + '%'}}</h3>
      <br />
      <span :class="color"> 我爱你啊</span>
      <input type="text" v-model="msg" />
      <el-slider v-model="binddata.value" style="width: 50%"></el-slider>
      <el-dialog :title="msg"></el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

class PersonData {
  value = 50;
}
@Component
export default class HelloWorld extends Vue {
  binddata: PersonData = new PersonData();
  msg = "我爱你中国";
  visible = false;
  data = [1, 20, 3, 4];
  color = "red";

  private test4() {
    console.log("hello world");
    this.msg = "chengjianglin";
    console.log(this.msg);
      this.$nextTick(() => { 
      console.log("nextTick new");
      console.log(this.$refs["header"]);
    });
  }
  protected mounted() {
    console.log("this is mounted");
    this.$nextTick(() => {
      console.log("nextTick");
      console.log(this.$refs["header"]);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.red {
  color: #42b983;
}
</style>
