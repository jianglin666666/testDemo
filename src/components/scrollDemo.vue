<template>
  <div class="marquee-wrap">
    <div class="marquee-content">
      <div class="scroll_div" @mouseover="mouseover" @mouseout="mouseout">
        <pre class="scroll_begin">无限滚动-如果内容宽度大于外层元素的宽度则进行滚动无限滚动-如果内容宽度大于外层元素的宽度则进行滚动</pre>
        <pre class="scroll_end" style="display:none;"></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll_div: "",
      scroll_begin: "",
      scroll_end: "",
      MyMar:null
    };
  },
  mounted() {
    this.scroll_div = document.getElementsByClassName("scroll_div")[0];
    this.scroll_begin = document.getElementsByClassName("scroll_begin")[0];
    this.scroll_end = document.getElementsByClassName("scroll_end")[0];
    if (this.scroll_begin && this.scroll_begin.offsetWidth > this.scroll_div.offsetWidth) {
      this.ScrollImgLeft();
      this.scroll_end.style.display = "inline-block";
    }
  },
  methods: {
    // 文字横向滚动
    ScrollImgLeft() {
      let speed = 15; // 滚动速度
      this.scroll_end.innerText = this.scroll_begin.innerText;
      this.MyMar = setInterval(this.Marquee, speed);
    },
    Marquee() {
        // console.log(this.scroll_end.offsetWidth,this.scroll_div.scrollLeft)
        if (this.scroll_end.offsetWidth - this.scroll_div.scrollLeft <= 0) {
          this.scroll_div.scrollLeft -= this.scroll_begin.offsetWidth;
        } else {
          this.scroll_div.scrollLeft++;
        }
    },
    mouseover(){
      clearInterval(this.MyMar);
    },
    mouseout(){
      if (this.scroll_begin && this.scroll_begin.offsetWidth > this.scroll_div.offsetWidth) {
        this.ScrollImgLeft();
        this.scroll_end.style.display = "inline-block";
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.marquee-wrap {
  box-sizing: border-box;
  width: 400px;
  height: 45px;
  margin: 16px auto 30px;
  background-image: linear-gradient(140deg, #ebd9eb 0%, #13bfdd 100%);
  line-height: 45px;
  font-size: 24px;
  text-align: center;
  border-radius: 32px;
  overflow: hidden;
  user-select: none;
}
.scroll_div {
  white-space: nowrap;
  overflow: hidden;
}
.scroll_div pre {
  display: inline-block;
  padding: 0 8px;
}
</style>
