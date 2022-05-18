<template>
  <div style="width:100%;height:100%;overflow:hidden;">
    <div class="box" ref="box">
      <div class="first">Page One</div>
      <div class="second">Page Two</div>
      <div class="third">Page Three</div>
    </div>
    <div style="margin-top:20px">
      <!-- <span class="btn-change" @click="goToPre(tabFlag)" ref="pre" v-if="tabFlag != 1">上一页</span>
      <span class="cancel" v-else>上一页</span>
      <span class="btn-change" @click="goToNext(tabFlag)" ref="next" v-if="tabFlag != 3">下一页</span>
      <span class="cancel" v-else>下一页</span> -->
      <span class="btn-change" @click="goToPre(tabFlag)" ref="pre">上一页</span>
      <span class="btn-change" @click="goToNext(tabFlag)" ref="next">下一页</span>
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
        this.$refs.box.style.marginLeft = '-200%';
        this.tabFlag = 3
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
        this.$refs.box.style.marginLeft = 0
        this.tabFlag = 1
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
  height: 400px;
  border:1px solid brown;
  background: brown;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 400px;
}
.second{
  width: 33.33%;
  height: 400px;
  border:1px solid blueviolet;
  background: blueviolet;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 400px;
}
.third{
  width: 33.33%;
  height: 400px;
  border:1px solid blue;
  background: blue;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 400px;
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
