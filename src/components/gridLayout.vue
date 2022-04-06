<template>
  <div class="container">
    <div class="box1 foo">1</div>
    <div class="box2 foo">2</div>
    <div class="box3 foo">3</div>
    <div class="box4 foo">4</div>
    <div class="box5 foo">5</div>
    <div class="box6 foo">6</div>
  </div>
  <!-- <div style="width:600px;">
    <h1>Simple float example</h1>
    <div class="box">Float</div>
    <p style="text-align:justify;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus
      aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci,
      pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc,
      at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta.
      Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula.
      Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae
      convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis.
      Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas
      augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut
      id ornare felis, eget fermentum sapien.
    </p>
  </div> -->
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>
<style scoped>
.box {
    float: left;
    width: 150px;
    height: 150px;
    margin-right: 30px;
    background: darkseagreen;
    line-height: 150px;
}
.container {
  margin: 30px auto;
  display: grid;
  perspective:150;
  -webkit-perspective:150; /* Safari and Chrome */
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 80px);
  justify-content: center;
  align-content: center;
  /* grid-template-columns: repeat(auto-fill, 50px);
  grid-template-rows: repeat(auto-fill, 50px); */
  grid-gap: 20px;
  /* border: 1px solid #000; */
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
}
.box1 {
  background: red;
  transform: rotateZ(15deg);
  animation: rotateY 2s linear infinite;
}
.box2 {
  background: skyblue;
  animation: rotateZ 2s linear infinite;
}
.box3 {
  background: greenyellow;
  transform: rotateZ(75deg);
}
.box4 {
  background: orchid;
  transform: rotateZ(-10deg);
  animation: rotateX 2s linear infinite;
}
.box5 {
  background: orange;
  animation: rotate 2s linear infinite;
}
.box6 {
  background: pink;
  transition: 0.3s;
}
@keyframes rotate {
  0% {
    /* transform: translateY(0px); */
    transform: rotateY(0deg);
  }
  25% {
    /* transform: translateY(15px); */
    transform: rotateY(90deg);
  }
  50% {
    /* transform: translateY(30px); */
    transform: rotateY(180deg);
  }
  75% {
    /* transform: translateY(15px); */
    transform: rotateY(270deg);

  }
  100% {
    /* transform: translateY(0px); */
    transform: rotateY(360deg);
  }
}
@keyframes rotateZ {
  0% {
    /* transform: translateY(0px); */
    transform: rotateZ(0deg);
  }
  25% {
    /* transform: translateY(15px); */
    transform: rotateZ(90deg);
  }
  50% {
    /* transform: translateY(30px); */
    transform: rotateZ(180deg);
  }
  75% {
    /* transform: translateY(15px); */
    transform: rotateZ(270deg);

  }
  100% {
    /* transform: translateY(0px); */
    transform: rotateZ(360deg);
  }
}
@keyframes rotateY {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(15px);
  }
  50% {
    transform: translateY(30px);
  }
  75% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes rotateX {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(15px);
  }
  50% {
    transform: translateX(30px);
  }
  75% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0px);
  }
}
.box6:hover {
  transform: rotateY(75deg);
}
.foo {
  line-height: 80px;
  text-align: center;
  color: #fff;
}
</style>
