<template>
  <div>
    <div class="scene">
      <div class="carousel" ref="carousel">
        <div class="carousel__cell">1</div>
        <div class="carousel__cell">2</div>
        <div class="carousel__cell">3</div>
        <div class="carousel__cell">4</div>
        <div class="carousel__cell">5</div>
        <div class="carousel__cell">6</div>
        <div class="carousel__cell">7</div>
        <div class="carousel__cell">8</div>
        <div class="carousel__cell">9</div>
        <div class="carousel__cell">10</div>
        <div class="carousel__cell">11</div>
        <div class="carousel__cell">12</div>
        <div class="carousel__cell">13</div>
        <div class="carousel__cell">14</div>
        <div class="carousel__cell">15</div>
      </div>
    </div>
    <div class="carousel-options">
      <p style="margin:0 auto;width:50%">
        <label>
          Cells
          <el-slider
            v-model="cellCount"
            @input="changeCarousel"
            :min="3"
            :max="15"
          ></el-slider>
        </label>
      </p>
      <p>
        <button class="previous-button" @click="prevButton">Previous</button>
        <button class="next-button" @click="nextButton" style="margin-left:10px">Next</button>
      </p>
      <p>
        Orientation:
        <el-switch
          v-model="value1"
          active-text="horizontal"
          inactive-text="vertical"
          @change="switchMethods"
        >
        </el-switch>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 注明此类为一个vue组件
@Component({})
export default class carouserDemo extends Vue {
  private value1 = true;
  private carousel:HTMLCollectionOf<Element>;
  private cells = [];
  private cellCount = 9; // cellCount set from cells-range input value
  private selectedIndex = 0;
  private isHorizontal = true;
  private rotateFn = "rotateY";
  private radius = 0;
  private theta = 0;
  protected mounted() {
    this.carousel = document.getElementsByClassName("carousel");
    this.cells = document.getElementsByClassName("carousel__cell") as any;
    this.changeCarousel();
    setInterval(this.nextButton, 1000);
  }

  private rotateCarousel() {
    // debugger
    let carouselObj = <HTMLElement>(
      document.getElementsByClassName("carousel")[0]
    );
    let angle = this.theta * this.selectedIndex * -1;
    carouselObj.style.transform = `translateZ(${this.radius}px)`;
    carouselObj.style.transform = `${this.rotateFn}(${angle}deg)`;
  }
  private nextButton() {
    this.selectedIndex++;
    this.rotateCarousel();
  }
  private prevButton() {
    this.selectedIndex--;
    this.rotateCarousel();
  }

  private changeCarousel() {
    let carouselObj = <HTMLElement>(
      document.getElementsByClassName("carousel")[0]
    );
    let cellWidth = carouselObj.offsetWidth;
    let cellHeight = carouselObj.offsetHeight;
    this.theta = 360 / this.cellCount;
    let cellSize = Number(this.isHorizontal ? cellWidth : cellHeight);
    this.radius = Math.round(cellSize / 2 / Math.tan(Math.PI / this.cellCount));
    // this.radius = 288;
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      if (i < this.cellCount) {
        // visible cell
        // debugger
        cell.style.opacity = 1;
        let cellAngle = this.theta * i;
        cell.style.transform = `${this.rotateFn}(${cellAngle}deg) translateZ(${this.radius}px)`;
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    }
    this.rotateCarousel();
  }
  private switchMethods(value) {
    console.log(value);
    this.isHorizontal = value;
    this.rotateFn = this.isHorizontal ? "rotateY" : "rotateX";
    this.changeCarousel();
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  text-align: center;
  background: #222;
}

.scene {
  border: 1px solid #ccc;
  margin: 40px 0;
  position: relative;
  width: 210px;
  height: 140px;
  margin: 80px auto;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateZ(-88px);
  transform-style: preserve-3d;
  transition: transform 1s;
}

.carousel__cell {
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  border: 2px solid black;
  line-height: 116px;
  font-size: 80px;
  font-weight: bold;
  color: white;
  text-align: center;
  transition: transform 1s, opacity 1s;
}

.carousel__cell:nth-child(9n + 1) {
  /* background: hsla(0, 100%, 50%, 0.8); */
  background: url(../assets/1.jpg) no-repeat;
  background-size: contain;
}
.carousel__cell:nth-child(9n + 2) {
  background: hsla(40, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 3) {
  background: hsla(80, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 4) {
  background: hsla(120, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 5) {
  background: hsla(160, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 6) {
  background: hsla(200, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 7) {
  background: hsla(240, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 8) {
  background: hsla(280, 100%, 50%, 0.8);
}
.carousel__cell:nth-child(9n + 0) {
  background: hsla(320, 100%, 50%, 0.8);
}

.carousel__cell:nth-child(1) {
  transform: rotateY(0deg) translateZ(88px);
}
.carousel__cell:nth-child(2) {
  transform: rotateY(40deg) translateZ(88px);
}
.carousel__cell:nth-child(3) {
  transform: rotateY(80deg) translateZ(88px);
}
.carousel__cell:nth-child(4) {
  transform: rotateY(120deg) translateZ(88px);
}
.carousel__cell:nth-child(5) {
  transform: rotateY(160deg) translateZ(88px);
}
.carousel__cell:nth-child(6) {
  transform: rotateY(200deg) translateZ(88px);
}
.carousel__cell:nth-child(7) {
  transform: rotateY(240deg) translateZ(188px);
}
.carousel__cell:nth-child(8) {
  transform: rotateY(280deg) translateZ(188px);
}
.carousel__cell:nth-child(9) {
  transform: rotateY(320deg) translateZ(88px);
}

.carousel-options {
  text-align: center;
  position: relative;
  z-index: 2;
  background: hsla(0, 0%, 100%, 0.8);
}
</style>
