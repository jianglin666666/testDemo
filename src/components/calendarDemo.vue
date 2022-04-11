<template>
  <div class="father">
    <template>
      <div style="width:50%;height:50%;margin:10px auto;">
        <div class="box">
            <div class="innerBox">你好</div>
        </div>
        <el-calendar style="height:50%">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(1).join("-") }}
              {{ data.isSelected ? "✔️" : "" }}
            </p>
          </template>
        </el-calendar>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.father {
  text-align: center;
  margin: 20px auto;
  height: 600px;
}
.father ::v-deep .is-selected {
  color: #1989fa;
}
.father ::v-deep .el-calendar-table td.is-today {
  background: red;
  color: #fff;
}
.father ::v-deep .el-calendar-table td.is-today.is-selected {
  background: red;
  color: #fff;
}
.father ::v-deep .el-calendar-table td.is-today .el-calendar-day:hover {
  background: red;
  color: #fff;
}
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
}
.innerBox {
  width: 100%;
  height: 100%;
  line-height: 200px;
}
.innerBox:hover {
  background: chartreuse;
}
.box:hover {
  background: chocolate;
}


</style>
