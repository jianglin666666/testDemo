<template>
  <div style="width:100%;height:100%;overflow:hidden;">
    <div class="box" ref="box">
      <div class="first">1111</div>
      <div class="second">2222</div>
      <div class="third">3333</div>
    </div>
    <div style="margin-top:20px">
      <span class="btn-change" @click="goToPre(tabFlag)" ref="pre" v-if="tabFlag != 1">上一页</span>
      <span class="cancel" v-else>上一页</span>
      <span class="btn-change" @click="goToNext(tabFlag)" ref="next" v-if="tabFlag != 3">下一页</span>
      <span class="cancel" v-else>下一页</span>
      <!-- <span class="btn-change" @click="goToFirst('3')">3</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "EchartsTest",
  data() {
    return {
      first:true,
      second:false,
      third:false,
      tabFlag: 1
    };
  },
  mounted() {

  },
  methods: {
    goToFirst(value){
      if(value == 1){
        this.$refs.box.style.marginLeft = '0'
        this.tabFlag++;
        return;
        // this.$refs.box.style.transform = 'translateX(0)';
      }
      if(value == '2'){
        this.$refs.box.style.marginLeft = '-100%';
        // this.$refs.box.style.transform = 'translateX(-33.33%)';
      }
      if(value == '3'){
        this.$refs.box.style.marginLeft = '-200%';
        // this.$refs.box.style.transform = 'translateX(-66.66%)';
      }
    
    },
    goToPre(value){
      if(value == 1){
        return 
        // this.$refs.box.style.marginLeft = '-200%'
        // this.tabFlag = 3
        // this.$refs.box.style.transform = 'translateX(0)';
      }
      if(value == 2){
        this.$refs.box.style.marginLeft = '0%';
        this.tabFlag--;
        // this.$refs.box.style.transform = 'translateX(-33.33%)';
      }
      if(value == 3){
        this.$refs.box.style.marginLeft = '-100%';
        this.tabFlag--;
        // this.$refs.box.style.transform = 'translateX(-66.66%)';
      }
    
    },
    goToNext(value){
      if(value == 1){
        this.$refs.box.style.marginLeft = '-100%';
        this.tabFlag++;
        // this.$refs.box.style.transform = 'translateX(0)';
      }
      if(value == 2){
        this.$refs.box.style.marginLeft = '-200%';
        this.tabFlag++;
        // this.$refs.box.style.transform = 'translateX(-33.33%)';
      }
      if(value == 3){
        return
        // this.$refs.box.style.marginLeft = '0%';
        // this.tabFlag = 1;
        // this.$refs.box.style.transform = 'translateX(-66.66%)';
      }
    
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.box {
  height: 100%;
  width: 300%;
  /* background-color: pink; */
  font-size: 1rem;
  display: flex;
  transition: all 0.5s;
}
.first{
  width: 33.33%;
  height: 100%;
  border:1px solid brown;
  background: brown;
}
.second{
  width: 33.33%;
  height: 100%;
  border:1px solid blueviolet;
  background: blueviolet;
}
.third{
  width: 33.33%;
  height: 100%;
  border:1px solid blue;
  background: blue;
}
.btn-change {
  cursor: pointer;
  display: inline-block;
  width: 100px;
  height: 30px;
  background: green;
  color: #fff;
  text-align: center;
  line-height: 35px;
  margin-left: 10px;
  border-radius: 5px;
}
.cancel{
  cursor: not-allowed;
  display: inline-block;
  width: 100px;
  height: 30px;
  background: #b3b3b3;
  color: #fff;
  text-align: center;
  line-height: 35px;
  margin-left: 10px;
  border-radius: 5px;
}
</style>
